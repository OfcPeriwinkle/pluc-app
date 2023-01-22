'use client';

import Image from 'next/image';
import DuplicateTrackCard from './DuplicateTrackCard';

export default function DuplicateTrackSection() {
  return (
    <>
      <hr className="border-gray-light border-opacity-30" />
      <h1 className="text-3xl font-bold">Strange Brew</h1>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        <DuplicateTrackCard />
        <DuplicateTrackCard />
        <DuplicateTrackCard />
      </div>
    </>
  );
}
