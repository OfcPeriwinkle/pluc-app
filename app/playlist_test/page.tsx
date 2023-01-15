import React from 'react';
import Image from 'next/image';

export default function PlaylistCard() {
  const playlist_image_url = 'https://i.scdn.co/image/ab67706c0000bebba69d1335fcb722bf9aa4c231';
  const playlist_name = 'Contraband';
  const user_name = 'Austin Wald';

  return (
    <div className="flex flex-col justify-center items-center max-w-fit bg-gray-light rounded-xl bg-opacity-20 p-6 gap-6 shadow-xl">
      <div className="flex flex-row gap-6 justify-evenly items-center w-full">
        <Image
          src={playlist_image_url}
          width={150}
          height={150}
          alt="Playlist Image"
          className="rounded-xl shadow-xl"
        />
        <div>
          <h1 className="text-3xl text-white font-semibold">{playlist_name}</h1>
          <h3 className="text-xl text-zinc-400 font-semibold">by {user_name}</h3>
        </div>
      </div>
      <button className="rounded-full bg-green p-4 hover:scale-105 text-l font-medium shadow-xl hover:shadow-2xl">
        Remove Duplicates
      </button>
    </div>
  );
}
