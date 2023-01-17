import { Artist, PlaylistTrack, Track } from 'spotify-types';
import getPermutations from './combinations';
import test_json from '../playlist_tracks.json';
import arrayProduct from './cartesian_product';
import jaro_similarity from './jaro_similarity';

interface PlucTreeNode {
  children?: Array<PlucTreeNode>;
}

function build_pluc_tree(playlist_tracks: PlaylistTrack[]) {
  const root: PlucTreeNode = {};
  const artist_nodes: Artist[] = [];

  // map for immutability
  playlist_tracks.map((entry) => {
    if (!entry.track || !('album' in entry.track)) {
      return;
    }

    // Get the first artist in the case of a collab
    artist_nodes.push(entry.track.artists[0]);
  });

  console.log(artist_nodes);
}

// function find_duplicates(artist_dict: any) {
//   artist_dict.map((artist) => {

//   });
// }

export default function test_main() {
  const artist_dict: any = {};

  test_json.map((entry) => {
    // Get the first artist in the case of a collab
    const artist = entry.track.artists[0];
    const album = entry.track.album;
    const track = entry.track;

    // Add artist node if it doesn't exist
    if (!(artist.id in artist_dict)) {
      artist_dict[artist.id] = {
        ...artist, // TODO: only take what we need, lots of duplicate data otherwise
        album_nodes: {},
      };
    }

    // Add album node to artist if it doesn't exist
    const artist_node = artist_dict[artist.id];

    if (!(album.id in artist_node['album_nodes'])) {
      artist_node['album_nodes'][album.id] = {
        ...album,
        track_nodes: [],
      };
    }

    // Add track to album node even if it exists
    // TODO: catch duplicates here
    const album_node = artist_node['album_nodes'][album.id];
    album_node['track_nodes'].push({ ...track });
  });

  /**
   * Extract this to it's own function, keeping in here for typehints
   * ALSO: This might make a ton of sense as a Python microservice
   * (or more likely a serveless function) since Python
   * is so so so so so SO much better at math and statistics stuff
   */
  Object.entries(artist_dict).map(([artist_id, artist_node]) => {
    const albums = artist_node.album_nodes;

    if (Object.keys(albums).length === 1) {
      return;
    }

    const permutations = getPermutations([Object.keys(albums)], 2);
    permutations.map(([album_a, album_b]) => {
      const track_nodes_a = albums[album_a].track_nodes;
      const track_nodes_b = albums[album_b].track_nodes;
      const track_combinations = arrayProduct(track_nodes_a, track_nodes_b);

      // Conduct comparison
      track_combinations.map(([track_a, track_b]) => {
        const similarity = jaro_similarity(track_a.name, track_b.name);
        const time_diff = Math.abs(track_a.duration_ms - track_b.duration_ms);

        if (similarity > 0.7 && time_diff < 5000) {
          console.log(
            'Duplicate Detected!',
            '\nA:',
            track_a.name,
            '\nB:',
            track_b.name,
            '\nSimilarity:',
            similarity,
            '\nTime Diff:',
            time_diff
          );
        }
      });
    });
  });
}
