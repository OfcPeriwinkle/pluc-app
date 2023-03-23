"use client";

import { PlaylistContext } from "../Contexts/PlaylistContext";
import PlaylistSearchResults from "./PlaylistSearchResults";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import type { SimplifiedPlaylist } from "spotify-types/typings/playlist";

interface PlaylistSearchResults {
  playlists: { items: SimplifiedPlaylist[] };
}

/** Contact pluc's API to search for a playlist_name */
async function playlist_search(
  playlist_name: string
): Promise<PlaylistSearchResults | null> {
  const res = await fetch(`/api/playlist_search?q=${playlist_name}`);

  if (res.status !== 200) {
    return null;
  }

  return res.json();
}

export default function Search() {
  const [playlist, setPlaylist] = useState("");
  const { searchResults, setSearchResults } = useContext(PlaylistContext);

  async function handle_enter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") {
      return;
    }

    const search_results = await playlist_search(playlist);

    if (!search_results) {
      alert(`Error searching for playlist ${playlist}`);
      return;
    }

    console.log(search_results.playlists.items);

    // Get list of playlists and use them to set the React state
    setSearchResults(search_results.playlists.items);
  }

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
        className="align-center h-14 w-1/2 rounded-full pl-5 pr-5 text-2xl text-gray-dark shadow-lg"
        placeholder="Find a playlist"
        name="playlist"
        type="text"
        onChange={(e) => {
          setPlaylist(e.target.value);
        }}
        onKeyDown={handle_enter}
      />
      {searchResults && <PlaylistSearchResults playlists={searchResults} />}
    </>
  );
}
