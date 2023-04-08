'use client';

import { FormEvent, RefObject, useState } from 'react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

const CHAR_LIMIT = 200;

/*
 * Enum for thumbs up and thumbs down.
 */
enum Thumbs {
  DOWN,
  UP,
  NONE,
}

/*
 * Handles the submission of feedback to the server.
 * @param thumbs_up - Thumbs up or thumbs down
 * @param message - Optional feedback message
 * @param playlist_id - ID of the playlist being rated
 * @returns boolean - Whether the submission was successful
 */
async function submit_feedback(
  thumbs_up: Thumbs,
  message: string,
  playlist_id: string = 'test_playlist_id'
): Promise<boolean> {
  const res = await fetch('/api/submit_feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      thumbs_up,
      message,
      playlist_id,
    }),
  });

  if (!res.ok) {
    alert('Error submitting feedback');
    return new Promise((resolve) => resolve(false));
  }

  alert('Feedback submitted!');
  return new Promise((resolve) => resolve(true));
}

/*
 * Form for submitting feedback.
 * @param textarea_ref - Reference for dialog initial focus
 * @param setOpen - Function to set the open state of the modal
 * @returns JSX.Element - Feedback form
 */
export default function FeedbackForm({
  textarea_ref,
  setOpen,
}: {
  textarea_ref: RefObject<HTMLTextAreaElement>;
  setOpen: Function;
}) {
  const [thumbs, setThumbs] = useState(Thumbs.NONE);
  const [charCount, setCharCount] = useState(0);

  async function on_submit(e: FormEvent) {
    e.preventDefault();

    if (thumbs == Thumbs.NONE) {
      alert('Please select a thumbs up or thumbs down.');
      return;
    }

    if (charCount > CHAR_LIMIT) {
      alert('Please limit your feedback message to 200 characters.');
      return;
    }

    const res = await submit_feedback(thumbs, e.target.message.value);

    if (res) {
      setThumbs(Thumbs.NONE);
      setOpen(false);
    }
  }

  return (
    <form className="mt-4" method="post" onSubmit={(e) => on_submit(e)}>
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
        name="message"
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
          name="submit"
          type="submit"
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
  );
}
