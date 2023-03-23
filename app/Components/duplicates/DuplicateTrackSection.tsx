import DuplicateTrackCard from "./DuplicateTrackCard";
import { Track } from "spotify-types";

export default function DuplicateTrackSection({
  section_name,
  duplicates,
}: {
  section_name: string;
  duplicates: Track[];
}) {
  return (
    <>
      <hr className="border-gray-light border-opacity-30" />
      <h1 className="text-3xl font-bold">{section_name}</h1>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {duplicates.map((duplicate) => {
          return <DuplicateTrackCard key={duplicate.id} track={duplicate} />;
        })}
      </div>
    </>
  );
}
