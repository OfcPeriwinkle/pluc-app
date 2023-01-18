import { Artist, PlaylistTrack, SimplifiedAlbum, Track } from 'spotify-types';
import { jaro } from 'jaro-winkler-typescript';
import 'lodash.combinations';
import 'lodash.product';
import _ from 'lodash';

interface PlucAlbum extends SimplifiedAlbum {
  track_nodes: Track[];
}

interface PlucArtist extends Artist {
  album_nodes: { [album_id: string]: PlucAlbum };
}

interface ArtistDict {
  [artist_id: string]: PlucArtist;
}

export default function get_duplicates(playlist_tracks: PlaylistTrack[]) {
  console.log('Getting duplicates...');
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
    album_node['track_nodes'].push(track);
  });

  find_duplicates(artist_dict);
  console.log('Done!');
}

/**
 * Find duplicates within a artist dictionary
 * This might make a ton of sense as a Python serveless function since Python
 * is so so so so so SO much better at math and statistics stuff
 *
 * TODO: make private and return something!
 */
function find_duplicates(artist_dict: ArtistDict) {
  Object.entries(artist_dict).map(([artist_id, artist_node]) => {
    const albums = artist_node.album_nodes;

    if (Object.keys(albums).length === 1) {
      return;
    }

    const permutations = _.combinations(Object.keys(albums), 2);

    permutations.map(([album_id_a, album_id_b]: string[]) => {
      const track_nodes_a = albums[album_id_a].track_nodes;
      const track_nodes_b = albums[album_id_b].track_nodes;
      const track_combinations = _.product(track_nodes_a, track_nodes_b);

      // Conduct comparison
      track_combinations.map(([track_a, track_b]: Track[]) => {
        const similarity = jaro(track_a.name, track_b.name, { caseSensitive: true });
        const time_diff = Math.abs(track_a.duration_ms - track_b.duration_ms);

        if (similarity > 0.7 && time_diff < 5000) {
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
        }
      });
    });
  });
}
