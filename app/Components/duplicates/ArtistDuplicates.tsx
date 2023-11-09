import { TrackWithDuplicates } from '../../../lib/pluc_duplicates';
import DuplicateTrackSection from './DuplicateTrackSection';
import Image from 'next/image';

export default function ArtistDuplicates({
  artistName,
  artistImage,
  tracksWithDuplicates,
  totalDuplicates,
}: {
  artistName: string;
  artistImage: string;
  tracksWithDuplicates: TrackWithDuplicates[];
  totalDuplicates: number;
}) {
  return (
    <section className="mb-24 mt-4 sm:mb-14 sm:rounded-md sm:bg-gray sm:bg-opacity-25 sm:p-6">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-gray bg-opacity-25 p-4 sm:flex-row sm:justify-start sm:bg-opacity-0 sm:p-0">
        <Image
          unoptimized
          src={artistImage}
          alt="Artist image"
          width={160}
          height={160}
          className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
        />
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-xl font-bold sm:text-2xl">{artistName}</h2>
          <p className="text-lg text-gray-light sm:text-xl">
            {`${tracksWithDuplicates.length} track${
              tracksWithDuplicates.length !== 1 ? 's' : ''
            } with ${totalDuplicates} potential duplicates`}
          </p>
        </div>
      </div>

      {tracksWithDuplicates.map((trackWithDuplicates, idx) => {
        return (
          <DuplicateTrackSection
            key={idx}
            sectionName={trackWithDuplicates.sectionName}
            duplicates={trackWithDuplicates.duplicates}
          />
        );
      })}
    </section>
  );
}
