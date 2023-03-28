'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const image = track.album.images[0];

  return (
    <button className="flex flex-col justify-center items-center p-2 w-40 bg-gray-light bg-opacity-10 rounded-md">
      <Image
        src={image.url}
        alt={`Album Art for ${track.name}`}
        width={160}
        height={160}
        className="h-36 w-36 object-contain"
      />
      <section className="text-start mt-2 w-full">
        <h3 className="truncate w-full font-semibold">{track.name}</h3>
        <p className="truncate w-full text-gray-light">{track.album.name}</p>
      </section>
    </button>
  );
}
