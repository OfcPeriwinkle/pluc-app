import React from 'react';
import Image from 'next/image';

export default function PlaylistCard() {
  const playlist_image_url = 'https://i.scdn.co/image/ab67706c0000bebba69d1335fcb722bf9aa4c231';
  const playlist_name = 'Contraband';
  const user_name = 'Austin Wald';

  return (
    <div className="flex flex-col justify-center items-center max-w-fit rounded-xl p-6 gap-6 bg-gray-light bg-opacity-20 shadow-xl">
      <div className="flex flex-row gap-6 justify-evenly items-center w-full">
        <Image
          src={playlist_image_url}
          width={150}
          height={150}
          alt="Playlist Image"
          className="rounded-xl shadow-xl"
        />
        <div>
          <h1 className="text-3xl font-semibold text-white">{playlist_name}</h1>
          <h3 className="text-xl font-semibold text-gray-light">by {user_name}</h3>
        </div>
      </div>
      <button className="rounded-full p-4 bg-green text-white text-l font-medium hover:shadow-xl hover:scale-105 duration-300">
        Find Duplicates
      </button>
    </div>
  );
}
