import Image from 'next/image';
import { TrackWithDuplicates } from '../../../lib/pluc_duplicates';
import DuplicateTrackSection from './DuplicateTrackSection';

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
    <section className="flex flex-col gap-5 rounded-xl bg-gray-light bg-opacity-10 p-7 shadow-xl">
      <div className="flex w-full gap-5">
        <Image
          src={artist_image}
          alt="Artist Picture"
          width={200}
          height={200}
          className="h-40 w-40 rounded-full object-cover shadow-lg"
        />
        <div className="flex w-full flex-col items-start justify-center">
          <h1 className="text-4xl font-bold">{artist_name}</h1>
          <h2 className="text-xl font-semibold text-gray-light">
            {tracks_with_duplicates.length} track(s) with {total_duplicates} potential duplicates
          </h2>
        </div>
      </div>

      {tracks_with_duplicates.map((track_with_duplicates) => {
        return (
          <DuplicateTrackSection
            // TODO: update the key here to something actually unique
            key={`${artist_name}${track_with_duplicates.section_name}`}
            section_name={track_with_duplicates.section_name}
            duplicates={track_with_duplicates.duplicates}
          />
        );
      })}
    </section>
  );
}
