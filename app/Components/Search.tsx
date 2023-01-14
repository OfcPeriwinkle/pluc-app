'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

async function playlist_search(playlist_name: string) {
  console.log(`Searching for ${playlist_name}`);

  // Contact pluc's API to search for the playlist
  const res = await fetch(`/api/playlist_search?q=${playlist_name}`);
  console.log(await res.json());
}

export default function Search() {
  const [playlist, setPlaylist] = useState('');

  return (
    <>
      {/* TODO: remove this button, it's just for testing */}
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </button>
      <input
        className="h-14 w-1/2 rounded-full text-2xl text-gray-dark align-center pl-5 pr-5 shadow-lg shadow-green"
        placeholder="Find a playlist"
        name="playlist"
        type="text"
        onChange={(e) => {
          setPlaylist(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // TODO: query spotify
            playlist_search(playlist);
          }
        }}
      />
    </>
  );
}
