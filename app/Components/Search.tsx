"use client";

import { useState } from "react";

function playlistSearch(playlistName: string) {
  alert(playlistName);
}

export default function Search() {
  const [playlist, setPlaylist] = useState("");

  return (
    <input
      className="h-14 w-1/2 rounded-full text-2xl text-gray-dark align-center pl-5 pr-5 shadow-lg shadow-green"
      placeholder="Find a playlist"
      name="playlist"
      type="text"
      onChange={(e) => {
        // TODO:
        setPlaylist(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // TODO: query spotify
          playlistSearch(playlist);
        }
      }}
    />
  );
}
