'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const image = track.album.images[0];

  return (
    <button className="flex flex-col justify-center items-center p-2 sm:p-4 w-40 sm:w-64 bg-gray-light bg-opacity-10 rounded-md hover:bg-opacity-25 ease-in-out duration-200 focus:scale-95">
      <Image
        src={image.url}
        alt={`${track.album.name} Artwork`}
        width={160}
        height={160}
        className="h-36 w-36 sm:h-56 sm:w-56 object-contain"
      />
      <section className="text-start mt-2 w-full">
        <h3 className="truncate w-full font-semibold sm:text-lg sm:mt-2">{track.name}</h3>
        <p className="truncate w-full text-gray-light sm:text-lg">{track.album.name}</p>
      </section>
    </button>
  );
}
