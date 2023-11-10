import { UndirectedGraph } from 'graphology';
import { forEachConnectedComponent } from 'graphology-components';
import { jaroWinkler } from 'jaro-winkler-typescript';
import _ from 'lodash';
import 'lodash.combinations';
import 'lodash.product';
import { PlaylistTrack, Track } from 'spotify-types';

// TODO: have these be configurable by the user
const TIME_DIFF_THRESHOLD_MS = 5000;
const JARO_WINKLER_SIMILARITY_THRESHOLD = 0.7;

// TODO: Store PlaylistTrack[] instead of Track[] so we can get added_at easily
export interface TrackWithDuplicates {
  sectionName: string;
  duplicates: Track[];
}

export interface ArtistWithDuplicates {
  artist: { name: string; image: string };
  tracksWithDuplicates: TrackWithDuplicates[];
  totalDuplicates: number;
}

export interface SimplifiedArtistWithDuplicates {
  artistID: string;
  tracksWithDuplicates: TrackWithDuplicates[];
  totalDuplicates: number;
}

/**
 * Dictionary of duplicate track results by artist.
 *
 * Each key is an artist ID for an artist who has duplicate tracks in the processed playlist.
 * Each value is a tuple containing metadata for the artist whose ID is the entry's key and
 * a DuplicateGraph of the duplicated tracks for that artist.
 */
interface DuplicateResults {
  [artistID: string]: UndirectedGraph;
}

interface PlucAlbum {
  name: string;
  trackNodes: Track[];
}

interface PlucArtist {
  name: string;
  albumNodes: { [albumID: string]: PlucAlbum };
}

interface ArtistDict {
  [artistID: string]: PlucArtist;
}

export default function get_duplicates(
  playlistTracks: PlaylistTrack[]
): SimplifiedArtistWithDuplicates[] {
  const artistDict = buildPlucTree(playlistTracks);
  const duplicatesByArtist = findDuplicates(artistDict);
  let artistDuplicates: SimplifiedArtistWithDuplicates[] = [];

  // Iterate over each artist's duplicate graph
  Object.entries(duplicatesByArtist).map(([artistID, duplicateGraph]) => {
    let tracksWithDuplicates: TrackWithDuplicates[] = [];
    let totalDuplicates = 0;

    // Each graphComponent is a cluster of songs that are duplicates of each other
    forEachConnectedComponent(duplicateGraph, (graphComponent) => {
      let shortestTrackName = '';
      let individual_duplicates: Track[] = [];

      // Iterate through all tracks that are duplicates of each other
      graphComponent.map((trackID) => {
        const trackDetails = duplicateGraph.getNodeAttributes(trackID) as Track;

        // Picking shortest name of all tracks within this component so that the overarching track
        // label can avoid being "Track Name - Remastered XXXX"
        if (
          !shortestTrackName ||
          trackDetails.name.length < shortestTrackName.length
        ) {
          shortestTrackName = trackDetails.name;
        }

        individual_duplicates.push(trackDetails);
        totalDuplicates++;
      });

      tracksWithDuplicates.push({
        sectionName: shortestTrackName,
        duplicates: individual_duplicates,
      });
    });

    artistDuplicates.push({
      artistID,
      tracksWithDuplicates: tracksWithDuplicates,
      totalDuplicates: totalDuplicates,
    });
  });

  return artistDuplicates;
}

function buildPlucTree(playlistTracks: PlaylistTrack[]): ArtistDict {
  const artistDict: ArtistDict = {};

  if (!playlistTracks) {
    return artistDict;
  }

  playlistTracks.map((entry) => {
    // Filter out playlist content that aren't tracks
    if (!entry || !entry.track || !('album' in entry.track)) {
      return;
    }

    // Get the first artist in the case of a collab
    const artist = entry.track.artists[0];
    const album = entry.track.album;
    const track = entry.track;

    // Add artist node if it doesn't exist
    if (!(artist.id in artistDict)) {
      artistDict[artist.id] = {
        name: artist.name,
        albumNodes: {},
      };
    }

    // Add album node to artist if it doesn't exist
    const artistNode = artistDict[artist.id];

    if (!(album.id in artistNode['albumNodes'])) {
      artistNode['albumNodes'][album.id] = {
        name: album.name,
        trackNodes: [],
      };
    }

    // Add track to album node even if it exists
    // TODO: catch duplicates here
    const albumNode = artistNode['albumNodes'][album.id];
    albumNode['trackNodes'].push(track);
  });

  return artistDict;
}

/**
 * Find duplicates within a artist dictionary
 */
function findDuplicates(artistDict: ArtistDict): DuplicateResults {
  let duplicatesByArtist: DuplicateResults = {};

  Object.entries(artistDict).map(([artistID, artistNode]) => {
    let duplicateGraph = new UndirectedGraph();
    const albums = artistNode.albumNodes;

    if (Object.keys(albums).length === 1) {
      return;
    }

    // Get all possible combinations of albums from those present in the playlist
    const permutations = _.combinations(Object.keys(albums), 2);
    permutations.map(([albumID_a, albumID_b]: string[]) => {
      const trackNodes_a = albums[albumID_a].trackNodes;
      const trackNodes_b = albums[albumID_b].trackNodes;

      // Get all possible ordered pairs of tracks between the two albums
      const trackPairs = _.product(trackNodes_a, trackNodes_b);
      trackPairs.map(([track_a, track_b]: Track[]) => {
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
        const timeDiff = Math.abs(track_a.duration_ms - track_b.duration_ms);
        if (timeDiff > TIME_DIFF_THRESHOLD_MS) {
          return;
        }

        // TODO: we should be able to use additional metadata from each track to make this
        // determination since string similarity only gets us so far
        // Calculate similarity metric
        const similarity = jaroWinkler(track_a.name, track_b.name, {
          caseSensitive: true,
        });
        if (similarity < JARO_WINKLER_SIMILARITY_THRESHOLD) {
          return;
        }

        // Tracks are likely duplicates, add them to the graph if they aren't already present
        if (!duplicateGraph.hasNode(track_a.id)) {
          duplicateGraph.addNode(track_a.id, { ...track_a });
        }
        if (!duplicateGraph.hasNode(track_b.id)) {
          duplicateGraph.addNode(track_b.id, { ...track_b });
        }

        // TODO: some edges can already be present when we hit this, this might mean traditional
        // duplicates aren't being caught
        if (!duplicateGraph.hasEdge(track_a.id, track_b.id)) {
          duplicateGraph.addEdge(track_a.id, track_b.id);
        }
      });
    });

    if (artistID in duplicatesByArtist) {
      throw Error("Artist's duplicate graph is about to be overridden");
    }

    if (duplicateGraph.order) {
      duplicatesByArtist[artistID] = duplicateGraph;
    }
  });

  return duplicatesByArtist;
}
