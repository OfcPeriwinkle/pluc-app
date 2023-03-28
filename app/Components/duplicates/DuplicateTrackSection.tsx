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
    // <div className="bg-gray-light rounded-md bg-opacity-5 p-4">
    <>
      <h2 className="text-xl font-bold mt-6">{section_name}</h2>
      <section className="grid grid-cols-2 justify-center items-center gap-4 mt-4">
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
