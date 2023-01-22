'use client';

import Image from 'next/image';
import DuplicateTrackSection from './Components/DuplicateTrackSection';
import ArtistDuplicates from './Components/ArtistDuplicates';
import duplicate_results from '../../duplicate_results.json';

export default function SandBox() {
  function handle_click() {
    Object.entries(duplicate_results).map((val) => {
      console.log(val);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 px-20 pb-20">
      <ArtistDuplicates />
      <ArtistDuplicates />
      <ArtistDuplicates />
      <ArtistDuplicates />
    </div>
  );
}
