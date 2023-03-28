import { TrackWithDuplicates } from '../../../lib/pluc_duplicates';
import DuplicateTrackSection from './DuplicateTrackSection';
import Image from 'next/image';

export default function ArtistDuplicates({
  artist_name,
  artist_image,
  tracks_with_duplicates,
  total_duplicates,
}: {
  artist_name: string;
  artist_image: string;
  tracks_with_duplicates: TrackWithDuplicates[];
  total_duplicates: number;
}) {
  return (
    <section className="mb-24 mt-4 sm:mb-14 sm:rounded-md sm:bg-gray sm:bg-opacity-25 sm:p-6">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-gray-light bg-opacity-5 p-4 sm:flex-row sm:justify-start sm:bg-opacity-0 sm:p-0">
        <Image
          src={artist_image}
          alt="Artist image"
          width={160}
          height={160}
          className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
        />
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-xl font-bold sm:text-2xl">{artist_name}</h2>
          <p className="text-lg text-gray-light sm:text-xl">
            {`${tracks_with_duplicates.length} track${
              tracks_with_duplicates.length !== 1 ? 's' : ''
            } with ${total_duplicates} potential duplicates`}
          </p>
        </div>
      </div>

      {tracks_with_duplicates.map((track_with_duplicates, idx) => {
        return (
          <DuplicateTrackSection
            key={idx}
            section_name={track_with_duplicates.section_name}
            duplicates={track_with_duplicates.duplicates}
          />
        );
      })}
    </section>
  );
}
