'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

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
            Feedback
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-lg text-gray-light">
            Pluc's duplicate detection is still in development. If you have any
            feedback about your results, fire away!
          </Dialog.Description>

          <form className="mt-4">
            <div className="flex w-full items-center justify-center gap-4">
              <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white transition duration-200 ease-in-out hover:bg-opacity-50">
                <HandThumbDownIcon className="h-10 w-10" />
              </button>

              <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white transition duration-200 ease-in-out hover:bg-opacity-50">
                <HandThumbUpIcon className="h-10 w-10" />
              </button>
            </div>

            <textarea
              className="mt-4 block h-44 w-full resize-none rounded-md border-white bg-gray-dark p-2 text-white"
              placeholder="Enter optional feedback message..."
            />
            <p className="mt-2 text-gray-light">0 / 200</p>

            <div className="mt-4 flex flex-col justify-around gap-4 sm:flex-row">
              <button
                className="h-11 rounded-full bg-green font-semibold duration-200 ease-in-out hover:scale-105 sm:h-12 sm:w-40"
                name="submit"
                onClick={() => setOpen(false)}
              >
                Send
              </button>
              <button
                className="h-11 rounded-full border-2 border-white font-semibold duration-200 ease-in-out hover:scale-105 hover:bg-gray-light hover:bg-opacity-25 sm:h-12 sm:w-40"
                name="cancel"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
