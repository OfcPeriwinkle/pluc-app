import React from 'react';
import Image from 'next/image';

export default function PlaylistCard() {
  const playlist_image_url = 'https://i.scdn.co/image/ab67706c0000bebba69d1335fcb722bf9aa4c231';
  const playlist_name = 'Contraband';
  const user_name = 'Austin Wald';

  return (
    <div className="group ease-in-out transition-all flex flex-col justify-center items-center max-w-fit rounded-xl p-6 gap-6 bg-gray hover:bg-gray-light hover:bg-opacity-20 hover:shadow-xl">
      <div className="flex flex-row gap-6 justify-evenly items-center w-full">
        <Image
          src={playlist_image_url}
          width={150}
          height={150}
          alt="Playlist Image"
          className="rounded-xl brightness-50 group-hover:brightness-100 group-hover:shadow-xl duration-300"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-light group-hover:text-white">
            {playlist_name}
          </h1>
          <h3 className="text-xl font-semibold text-gray-light">by {user_name}</h3>
        </div>
      </div>
      <button className="rounded-full p-4 bg-gray group-hover:bg-green duration-300 text-gray-light group-hover:text-white text-l font-medium hover:shadow-xl hover:scale-105">
        Remove Duplicates
      </button>
    </div>
  );
}
