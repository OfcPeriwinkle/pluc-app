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
      <h2 className="text-xl font-bold mt-6 sm:text-2xl">{section_name}</h2>
      <hr className="border-gray-light border-opacity-20 mt-2 mb-4 border-2 rounded-full" />
      <section className="grid grid-cols-2 justify-center items-center sm:flex sm:flex-wrap gap-4 mt-4">
        {duplicates.map((duplicate) => {
          return (
            <div className="flex justify-center items-center">
              <DuplicateTrackCard key={duplicate.id} track={duplicate} />
            </div>
          );
        })}
      </section>
    </>
    // </div>
  );
}
