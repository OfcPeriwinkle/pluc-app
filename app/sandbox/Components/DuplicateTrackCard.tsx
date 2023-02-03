'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const image = track.album.images[0];

  return (
    <div className="group flex w-fit flex-col  items-center  justify-center gap-4 rounded-xl bg-gray-light bg-opacity-10 p-4 duration-200 ease-in-out hover:bg-opacity-20">
      <div className="flex flex-row gap-5">
        <Image
          src={image.url}
          alt="Album Art"
          width={300}
          height={300}
          className="h-w-32 w-32 rounded-xl object-cover shadow-lg group-hover:shadow-xl"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold">{track.name}</h2>
          <h3 className="text-l font-medium text-gray-light">on {track.album.name}</h3>
        </div>
      </div>
      <button className="w-40 rounded-full bg-red-600 p-2 font-medium shadow-xl duration-200 ease-in-out hover:scale-105 hover:shadow-2xl">
        Remove Track
      </button>
    </div>
  );
}
