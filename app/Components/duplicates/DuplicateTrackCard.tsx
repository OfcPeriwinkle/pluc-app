'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
  const image = track.album.images[0];

  function handle_click() {
    setOpen(true);
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
        </section>
      </button>

      {/* TODO: This is a proof of concept; use context to have this update in one place? */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-gray p-4">
            <Dialog.Title className="text-xl font-semibold">
              Remove track?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-lg text-gray-light">
              This will permanently remove "{track.name}" from your playlist.
            </Dialog.Description>

            <div className="mt-4 flex flex-col justify-around gap-4 sm:flex-row">
              <button
                className="h-11 rounded-full bg-red-600 font-semibold duration-200 ease-in-out hover:scale-105 sm:h-12 sm:w-40"
                onClick={() => setOpen(false)}
              >
                Remove
              </button>
              <button
                className="h-11 rounded-full border-2 border-white font-semibold duration-200 ease-in-out hover:scale-105 hover:bg-gray-light hover:bg-opacity-25 sm:h-12 sm:w-40"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
