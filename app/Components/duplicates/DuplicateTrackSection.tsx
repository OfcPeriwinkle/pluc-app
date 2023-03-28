import DuplicateTrackCard from './DuplicateTrackCard';
import { Track } from 'spotify-types';

export default function DuplicateTrackSection({
  section_name,
  duplicates,
}: {
  section_name: string;
  duplicates: Track[];
}) {
  return (
    <>
      <h2 className="mt-6 text-xl font-bold sm:text-2xl">{section_name}</h2>
      <hr className="mb-4 mt-2 rounded-full border-2 border-gray-light border-opacity-20" />
      <section className="mt-4 grid grid-cols-2 items-center justify-center gap-4 sm:flex sm:flex-wrap">
        {duplicates.map((duplicate) => {
          return (
            <div className="flex items-center justify-center">
              <DuplicateTrackCard key={duplicate.id} track={duplicate} />
            </div>
          );
        })}
      </section>
    </>
  );
}
