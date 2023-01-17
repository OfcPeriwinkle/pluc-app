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
  const artist_dict: any = {};

  // map for immutability
  test_json.map((entry) => {
    // Get the first artist in the case of a collab
    const artist = entry.track.artists[0];
    const album = entry.track.album;
    const track = entry.track;

    // Add artist node if it doesn't exist
    if (!(artist.name in artist_dict)) {
      artist_dict[artist.name] = {
        ...artist, // TODO: only take what we need, lots of duplicate data otherwise
        album_nodes: {},
      };
    }

    // Add album node to artist if it doesn't exist
    const artist_node = artist_dict[artist.name];

    if (!(album.id in artist_node['album_nodes'])) {
      artist_node['album_nodes'][album.id] = {
        ...album,
        track_nodes: [],
      };
    }

    // Add track to album node even if it exists
    const album_node = artist_node['album_nodes'][album.id];
    album_node['track_nodes'].push({ ...track });
  });

  console.log(artist_dict);
}
