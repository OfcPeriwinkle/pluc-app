'use client';

import PlaylistDuplicates from './Components/PlaylistDuplicates';
import get_duplicates from '../../lib/pluc_duplicates';
import { PlaylistTrack } from 'spotify-types';
import test_artist_dict from '../../test_artist_dict.json';

// TEST: 3GnRpO3H46wequDRjo2UFL -- Test playlist
export default function DuplicatePage({ params }: { params: { playlist_id: string } }) {
  async function handle_click() {
    console.log('In handle_click');

    const res = await fetch(`/api/playlist_tracks?id=${params.playlist_id}`);

    if (res.status !== 200) {
      return null;
    }

    const playlist_tracks = (await res.json()) as PlaylistTrack[];
    get_duplicates(playlist_tracks);
  }

  return (
    <>
      <PlaylistDuplicates playlist_id={params.playlist_id} />
      <button onClick={handle_click}>Run test</button>
    </>
  );
}
