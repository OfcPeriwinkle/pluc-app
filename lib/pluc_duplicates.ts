import { Artist, PlaylistTrack, Track } from 'spotify-types';
import test_json from '../playlist_tracks.json';

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

export default function test_main() {
  const root: PlucTreeNode = {};
  const artist_nodes: any = {};

  // map for immutability
  test_json.map((entry) => {
    // Get the first artist in the case of a collab

    if (!(entry.track.artists[0].name in artist_nodes)) {
      const artist_node = {
        ...entry.track.artists[0],
        //   TODO: album list
      };
      artist_nodes[`${artist_node.name}`] = artist_node;
    }
  });

  console.log(artist_nodes);
}
