import { Artist, PlaylistTrack, SimplifiedAlbum, Track } from 'spotify-types';
import { jaroWinkler } from 'jaro-winkler-typescript';
import 'lodash.combinations';
import 'lodash.product';
import _ from 'lodash';

// TODO: have these be configurable by the user
const TIME_DIFF_THRESHOLD_MS = 5000;
const JARO_WINKLER_SIMILARITY_THRESHOLD = 0.7;

/**
 * DuplicateGraph
 *
 * Adjaceny lists for all tracks containing duplicates.
 *
 * Each key is a track ID that has duplicates and each value is a tuple containing metadata for the
 * track whose ID is being used as the key and list of that track's identified duplicates.
 */
export interface DuplicateGraph {
  [track_id: string]: [Track, Track[]];
}

/**
 * Dictionary of duplicate track results by artist.
 *
 * Each key is an artist ID for an artist who has duplicate tracks in the processed playlist.
 * Each value is a tuple containing metadata for the artist whose ID is the entry's key and
 * a DuplicateGraph of the duplicated tracks for that artist.
 */
export interface DuplicateResults {
  [artist_id: string]: [Artist, DuplicateGraph];
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

export default function get_duplicates(playlist_tracks: PlaylistTrack[]): DuplicateResults {
  console.log('Getting duplicates...');
  const artist_dict = build_pluc_tree(playlist_tracks);
  // return find_duplicates(artist_dict);
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
    let duplicate_graph: DuplicateGraph = {};
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

        // Tracks are likely duplicates create a duplicate graph if the current track doesn't have
        // one and add the duplicate track to the current node's adjacency list
        if (!(track_a.id in duplicate_graph)) {
          duplicate_graph[track_a.id] = [track_a, []];
        }

        duplicate_graph[track_a.id][1].push(track_b);
        console.log(
          'Duplicate Detected!',
          '\nA:',
          track_a.name,
          track_a.id,
          '\nB:',
          track_b.name,
          track_b.id,
          '\nSimilarity:',
          similarity,
          '\nTime Diff:',
          time_diff
        );
      });
    });

    if (artist_id in duplicates_by_artist) {
      throw Error("Artist's duplicate graph is about to be overridden");
    }

    console.log(artist_node.name, duplicate_graph);
    if (!_.isEmpty(duplicate_graph)) {
      duplicates_by_artist[artist_id] = [artist_node, duplicate_graph];
    }
  });

  console.log(duplicates_by_artist);
  return duplicates_by_artist;
}
