'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const image = track.album.images[0];

  return (
    <button className="flex w-40 flex-col items-center justify-center rounded-md bg-gray-light bg-opacity-10 p-2 duration-200 ease-in-out hover:bg-opacity-25 focus:scale-95 sm:w-64 sm:p-4">
      <Image
        src={image.url}
        alt={`${track.album.name} Artwork`}
        width={160}
        height={160}
        className="h-36 w-36 object-contain sm:h-56 sm:w-56"
      />
      <section className="mt-2 w-full text-start">
        <h3 className="w-full truncate font-semibold sm:mt-2 sm:text-lg">
          {track.name}
        </h3>
        <p className="w-full truncate text-gray-light sm:text-lg">
          {track.album.name}
        </p>
      </section>
    </button>
  );
}
