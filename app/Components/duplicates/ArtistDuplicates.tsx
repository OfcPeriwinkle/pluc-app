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
    <section className="mt-14 sm:bg-gray sm:bg-opacity-25 sm:rounded-md sm:p-6">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center bg-gray-light bg-opacity-5 sm:bg-opacity-0 rounded-md p-4 sm:p-0 w-full gap-4">
        <Image
          src={artist_image}
          alt="Artist image"
          width={160}
          height={160}
          className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-xl sm:text-2xl font-bold">{artist_name}</h2>
          <p className="text-lg sm:text-xl text-gray-light">
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
