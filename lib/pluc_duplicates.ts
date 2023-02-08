import { Artist, PlaylistTrack, Track } from 'spotify-types';
import { jaroWinkler } from 'jaro-winkler-typescript';
import 'lodash.combinations';
import 'lodash.product';
import _ from 'lodash';
import { UndirectedGraph } from 'graphology';
import { forEachConnectedComponent } from 'graphology-components';

// TODO: have these be configurable by the user
const TIME_DIFF_THRESHOLD_MS = 5000;
const JARO_WINKLER_SIMILARITY_THRESHOLD = 0.7;

export interface TrackWithDuplicates {
  section_name: string;
  duplicates: Track[];
}

export interface ArtistWithDuplicates {
  artist: { name: string; image: string };
  tracks_with_duplicates: TrackWithDuplicates[];
  total_duplicates: number;
}

/**
 * Dictionary of duplicate track results by artist.
 *
 * Each key is an artist ID for an artist who has duplicate tracks in the processed playlist.
 * Each value is a tuple containing metadata for the artist whose ID is the entry's key and
 * a DuplicateGraph of the duplicated tracks for that artist.
 */
interface DuplicateResults {
  [artist_id: string]: UndirectedGraph;
}

interface PlucAlbum {
  name: string;
  track_nodes: Track[];
}

interface PlucArtist {
  name: string;
  album_nodes: { [album_id: string]: PlucAlbum };
}

interface ArtistDict {
  [artist_id: string]: PlucArtist;
}

export default function get_duplicates(playlist_tracks: PlaylistTrack[]): ArtistWithDuplicates[] {
  const artist_dict = build_pluc_tree(playlist_tracks);
  const duplicates_by_artist = find_duplicates(artist_dict);
  let artists_with_duplicates: ArtistWithDuplicates[] = [];

  // Iterate over each artist's duplicate graph
  Object.entries(duplicates_by_artist).map(([artist_id, duplicate_graph]) => {
    let tracks_with_duplicates: TrackWithDuplicates[] = [];
    let total_duplicates = 0;

    // Each graph_component is a cluster of songs that are duplicates of each other
    forEachConnectedComponent(duplicate_graph, (graph_component) => {
      let shortest_track_name = '';
      let individual_duplicates: Track[] = [];

      // Iterate through all tracks that are duplicates of each other
      graph_component.map((track_id) => {
        const track_details = duplicate_graph.getNodeAttributes(track_id) as Track;

        // Picking shortest name of all tracks within this component so that the overarching track
        // label can avoid being "Track Name - Remastered XXXX"
        if (!shortest_track_name || track_details.name.length < shortest_track_name.length) {
          shortest_track_name = track_details.name;
        }

        individual_duplicates.push(track_details);
        total_duplicates++;
      });

      tracks_with_duplicates.push({
        section_name: shortest_track_name,
        duplicates: individual_duplicates,
      });
    });

    // TODO: perform this fetch somewhere else maybe? Or find a way to make this function async
    // //  TODO: batch these requests so we only send one request for all artists
    // const res = await fetch(`/api/artist_details?q=${artist_id}`);

    // if (!res.ok) {
    //   return null;
    // }

    // const artist_details = (await res.json()).artists[0] as Artist;

    artists_with_duplicates.push({
      artist: {
        name: 'Placeholder',
        image: 'https://i.scdn.co/image/ab6761610000e5eba213bd0d2152db1ce9c8da70',
      },
      tracks_with_duplicates: tracks_with_duplicates,
      total_duplicates: total_duplicates,
    });
  });

  console.log(artists_with_duplicates);
  return artists_with_duplicates;
}

function build_pluc_tree(playlist_tracks: PlaylistTrack[]): ArtistDict {
  const artist_dict: ArtistDict = {};

  playlist_tracks.map((entry) => {
    // Filter out playlist content that aren't tracks
    if (!entry || !entry.track || !('album' in entry.track)) {
      return;
    }

    // Get the first artist in the case of a collab
    const artist = entry.track.artists[0];
    const album = entry.track.album;
    const track = entry.track;

    // Add artist node if it doesn't exist
    if (!(artist.id in artist_dict)) {
      artist_dict[artist.id] = {
        name: artist.name,
        album_nodes: {},
      };
    }

    // Add album node to artist if it doesn't exist
    const artist_node = artist_dict[artist.id];

    if (!(album.id in artist_node['album_nodes'])) {
      artist_node['album_nodes'][album.id] = {
        name: album.name,
        track_nodes: [],
      };
    }

    // Add track to album node even if it exists
    // TODO: catch duplicates here
    const album_node = artist_node['album_nodes'][album.id];
    album_node['track_nodes'].push(track);
  });

  console.log(artist_dict);
  return artist_dict;
}

/**
 * Find duplicates within a artist dictionary
 * This might make a ton of sense as a Python serveless function since Python
 * is so so so so so SO much better at math and statistics stuff
 *
 */
function find_duplicates(artist_dict: ArtistDict): DuplicateResults {
  let duplicates_by_artist: DuplicateResults = {};

  Object.entries(artist_dict).map(([artist_id, artist_node]) => {
    let duplicate_graph = new UndirectedGraph();
    const albums = artist_node.album_nodes;

    if (Object.keys(albums).length === 1) {
      return;
    }

    // Get all possible combinations of albums from those present in the playlist
    const permutations = _.combinations(Object.keys(albums), 2);
    permutations.map(([album_id_a, album_id_b]: string[]) => {
      const track_nodes_a = albums[album_id_a].track_nodes;
      const track_nodes_b = albums[album_id_b].track_nodes;

      // Get all possible ordered pairs of tracks between the two albums
      const track_pairs = _.product(track_nodes_a, track_nodes_b);
      track_pairs.map(([track_a, track_b]: Track[]) => {
        // TODO: make this it's own function
        // TODO: Spotify allows songs with empty names; we should handle this eventually since these
        // tracks are unplayable and should be removed
        if (track_a.name.length === 0 || track_b.name.length === 0) {
          return;
        }

        // If the first characters of the title are diff, tracks are diff
        if (track_a.name[0] !== track_b.name[0]) {
          return;
        }

        // If the tracks are very diff time-wise, they're likely diff
        const time_diff = Math.abs(track_a.duration_ms - track_b.duration_ms);
        if (time_diff > TIME_DIFF_THRESHOLD_MS) {
          return;
        }

        // TODO: we should be able to use additional metadata from each track to make this
        // determination since string similarity only gets us so far
        // Calculate similarity metric
        const similarity = jaroWinkler(track_a.name, track_b.name, { caseSensitive: true });
        if (similarity < JARO_WINKLER_SIMILARITY_THRESHOLD) {
          return;
        }

        // Tracks are likely duplicates, add them to the graph if they aren't already present
        if (!duplicate_graph.hasNode(track_a.id)) {
          duplicate_graph.addNode(track_a.id, { ...track_a });
        }
        if (!duplicate_graph.hasNode(track_b.id)) {
          duplicate_graph.addNode(track_b.id, { ...track_b });
        }

        // TODO: some edges can already be present when we hit this, this might mean traditional
        // duplicates aren't being caught
        if (!duplicate_graph.hasEdge(track_a.id, track_b.id)) {
          duplicate_graph.addEdge(track_a.id, track_b.id);
        }
      });
    });

    if (artist_id in duplicates_by_artist) {
      throw Error("Artist's duplicate graph is about to be overridden");
    }

    if (duplicate_graph.order) {
      duplicates_by_artist[artist_id] = duplicate_graph;
    }
  });

  return duplicates_by_artist;
}
