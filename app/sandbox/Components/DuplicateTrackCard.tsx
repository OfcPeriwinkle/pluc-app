'use client';

import Image from 'next/image';

export default function DuplicateTrackCard() {
  return (
    <div className="group flex flex-col justify-center  items-center  gap-4 w-fit rounded-xl p-4 bg-gray-light bg-opacity-10 hover:bg-opacity-20 ease-in-out duration-200">
      <div className="flex flex-row gap-5">
        <Image
          src="https://i.scdn.co/image/ab67616d00001e02db1fb2dede292908e86d94d7"
          alt="Album Art"
          width={300}
          height={300}
          className="rounded-xl w-32 h-w-32 object-cover shadow-lg group-hover:shadow-xl"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold">Strange Brew</h2>
          <h3 className="text-l text-gray-light font-medium">on Disraeli Gears (Deluxe Edition)</h3>
        </div>
      </div>
      <button className="rounded-full bg-red-600 font-medium w-40 p-2 hover:scale-105 shadow-xl hover:shadow-2xl ease-in-out duration-200">
        Remove Track
      </button>
    </div>
  );
}
