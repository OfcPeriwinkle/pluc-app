import Image from 'next/image';
import DuplicateTrackSection from './DuplicateTrackSection';

export default function ArtistDuplicates() {
  return (
    <section className="flex flex-col bg-gray-light bg-opacity-10 rounded-xl p-7 gap-5 shadow-xl">
      <div className="flex w-full gap-5">
        <Image
          src="https://i.scdn.co/image/a4ba54e5ad0a2ef0324205130cca16df1e19c822"
          alt="Artist Picture"
          width={200}
          height={200}
          className="rounded-full w-40 h-40 object-cover shadow-lg"
        />
        <div className="flex flex-col justify-center items-start w-full">
          <h1 className="text-4xl font-bold">Cream</h1>
          <h2 className="text-xl font-semibold text-gray-light">
            {1} track with {2} potential duplicates
          </h2>
        </div>
      </div>

      <DuplicateTrackSection />
      <DuplicateTrackSection />
    </section>
  );
}
