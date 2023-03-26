'use client';

import { PlaylistContext } from '../../Contexts/PlaylistContext';
import PlaylistSearchResults from './PlaylistSearchResults';
import { useContext, useState } from 'react';
import type { SimplifiedPlaylist } from 'spotify-types/typings/playlist';

interface PlaylistSearchResults {
  playlists: { items: SimplifiedPlaylist[] };
}

/** Contact pluc's API to search for a playlist_name */
async function playlist_search(playlist_name: string): Promise<PlaylistSearchResults | null> {
  const res = await fetch(`/api/playlist_search?q=${playlist_name}`);

  if (res.status !== 200) {
    return null;
  }

  return res.json();
}

export default function Search() {
  const [playlist, setPlaylist] = useState('');
  const { searchResults, setSearchResults } = useContext(PlaylistContext);

  async function handle_enter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') {
      return;
    }

    const search_results = await playlist_search(playlist);

    if (!search_results) {
      alert(`Error searching for playlist ${playlist}`);
      return;
    }

    // Get list of playlists and use them to set the React state
    setSearchResults(search_results.playlists.items);
  }

  return (
    <div className="mt-6 sm:mt-10 flex w-5/6 sm:w-1/2 justify-center text-sm">
      <input
        className="font-semibold h-12 w-full px-4 rounded-full bg-white text-gray-dark focus:outline-black"
        placeholder="Search for a playlist"
        name="playlist"
        type="text"
        onChange={(e) => {
          setPlaylist(e.target.value);
        }}
        onKeyDown={handle_enter}
      />
      {searchResults.length > 0 && <PlaylistSearchResults playlists={searchResults} />}
    </div>
  );
}
