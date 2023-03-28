'use client';

import { useState } from 'react';

export default function RemoveModal() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="rounded-md bg-gray bg-opacity-30 p-4">
      <div>
        <h2 className="text-xl font-semibold">Remove track?</h2>
        <p className="mt-2 text-lg text-gray-light">
          Are you sure you want to remove this track from your playlist?
        </p>
      </div>
      <div className="mt-4 flex flex-col-reverse justify-around gap-4 sm:flex-row">
        <button className="h-11 rounded-full border-2 border-white duration-200 ease-in-out hover:scale-105 hover:bg-gray-light hover:bg-opacity-25 focus:scale-95 sm:h-12 sm:w-40">
          Cancel
        </button>
        <button className="h-11 rounded-full bg-red-600 duration-200 ease-in-out hover:scale-105 focus:scale-95 sm:h-12 sm:w-40">
          Remove
        </button>
      </div>
    </aside>
  );
}
