import DuplicateTrackCard from './DuplicateTrackCard';
import { PlaylistTrack, Episode } from 'spotify-types';

function isEpisode(arg: any): arg is Episode {
  return arg.show !== undefined;
}

export default function DuplicateTrackSection({
  section_name,
  duplicates,
}: {
  section_name: string;
  duplicates: PlaylistTrack[];
}) {
  return (
    <>
      <h2 className="text-xl font-bold mt-6 sm:text-2xl">{section_name}</h2>
      <hr className="border-gray-light border-opacity-20 mt-2 mb-4 border-2 rounded-full" />
      <section className="grid grid-cols-2 justify-center items-center sm:flex sm:flex-wrap gap-4 mt-4">
        {/* TODO: pass PlaylistTracks into this component */}
        {duplicates.map((duplicate) => {
          if (!duplicate.track || isEpisode(duplicate.track)) {
            return null;
          }

          return (
            <div className="flex justify-center items-center">
              <DuplicateTrackCard
                key={duplicate.track.id}
                track={duplicate.track}
                added_at={duplicate.added_at}
              />
            </div>
          );
        })}
      </section>
    </>
    // </div>
  );
}
