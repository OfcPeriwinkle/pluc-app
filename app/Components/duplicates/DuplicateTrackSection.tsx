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
      <section className="mt-4 grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
        {duplicates.map((duplicate) => {
          return <DuplicateTrackCard key={duplicate.id} track={duplicate} />;
        })}
      </section>
    </>
  );
}
