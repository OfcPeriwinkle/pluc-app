'use client';

import PlaylistDuplicates from './Components/PlaylistDuplicates';
import test_main from '../../lib/pluc_duplicates';

// TEST: 3GnRpO3H46wequDRjo2UFL -- Test playlist
export default function DuplicatePage({ params }: { params: { playlist_id: string } }) {
  console.log('running stuff');
  return (
    <>
      <PlaylistDuplicates playlist_id={params.playlist_id} />
      <button onClick={test_main}>Run test</button>
    </>
  );
}
