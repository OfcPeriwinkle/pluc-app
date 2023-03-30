'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function RemoveModal() {
  const [open, setOpen] = useState(true);

  return (
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
            This will permanently remove the track from your playlist.
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
  );
}
