'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';
import { useContext } from 'react';
import { TrackRemovalContext } from '../../Contexts/TrackRemovalContext';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const { setModalOpen, setTrack } = useContext(TrackRemovalContext);
  const image = track.album.images[0];

  function handle_click() {
    setTrack(track);
    setModalOpen(true);
  }

  return (
    <>
      <button
        className="flex w-full flex-col items-center justify-center rounded-md bg-gray bg-opacity-25 p-4 duration-200 ease-in-out hover:bg-opacity-100 focus:scale-95 sm:w-64 sm:bg-gray-light sm:bg-opacity-10 sm:p-4 sm:hover:bg-opacity-25"
        onClick={handle_click}
      >
        <Image
          src={image.url}
          alt={`${track.album.name} Artwork`}
          width={160}
          height={160}
          className="h-36 w-36 object-contain sm:h-56 sm:w-56"
        />
        <section className="mt-2 w-full text-start">
          <h3 className="mt-2 w-full truncate font-semibold sm:text-lg">
            {track.name}
          </h3>
          <p className="mt-2 w-full truncate text-gray-light sm:text-lg">
            {track.album.name}
          </p>
          {/* TODO: Add the date the track was added on */}
        </section>
      </button>
    </>
  );
}
