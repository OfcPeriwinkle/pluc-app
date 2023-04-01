'use client';

import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

const CHAR_LIMIT = 200;

enum Thumbs {
  NONE,
  UP,
  DOWN,
}

export default function FeedbackModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const [thumbs, setThumbs] = useState(Thumbs.NONE);
  const [charCount, setCharCount] = useState(0);
  const textarea_ref = useRef(null);

  return (
    <Dialog
      className="relative z-50"
      initialFocus={textarea_ref}
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-gray p-4">
          <Dialog.Title className="text-xl font-semibold">
            Feedback
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-lg text-gray-light">
            Duplicate detection is still in development. If you have any
            feedback about your results, fire away!
          </Dialog.Description>

          <form className="mt-4">
            <div className="flex w-full items-center justify-center gap-4">
              <button
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-white transition duration-200 ease-in-out hover:scale-105 ${
                  thumbs == Thumbs.DOWN ? 'bg-red-600' : ''
                }`}
                onClick={() => setThumbs(Thumbs.DOWN)}
                name="thumbs-down"
                type="button"
              >
                <HandThumbDownIcon className="h-10 w-10" />
              </button>

              <button
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-white transition duration-200 ease-in-out hover:scale-105 ${
                  thumbs == Thumbs.UP ? 'bg-green hover:bg-green' : ''
                }`}
                onClick={() => setThumbs(Thumbs.UP)}
                name="thumbs-up"
                type="button"
              >
                <HandThumbUpIcon className="h-10 w-10" />
              </button>
            </div>

            <textarea
              className={`mt-4 block h-44 w-full resize-none rounded-md bg-gray-dark p-2 text-white ${
                charCount > CHAR_LIMIT
                  ? 'border-2 border-red-600 focus:outline-none'
                  : ''
              }`}
              placeholder="Enter optional feedback message..."
              ref={textarea_ref}
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            <p
              className={`mt-2 ${
                charCount > CHAR_LIMIT ? 'text-red-600' : 'text-gray-light'
              }`}
            >{`${charCount} / ${CHAR_LIMIT}`}</p>

            <div className="mt-4 flex flex-col justify-around gap-4 sm:flex-row-reverse">
              <button
                className="h-11 rounded-full bg-green font-semibold duration-200 ease-in-out hover:scale-105 sm:h-12 sm:w-40"
                onClick={() => setOpen(false)}
                name="submit"
                type="button"
              >
                Send
              </button>
              <button
                className="h-11 rounded-full border-2 border-white font-semibold duration-200 ease-in-out hover:scale-105 hover:bg-gray-light hover:bg-opacity-25 sm:h-12 sm:w-40"
                onClick={() => setOpen(false)}
                name="cancel"
                type="button"
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
