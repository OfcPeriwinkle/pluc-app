"use client";

import duplicate_results from "../../duplicate_results.json";
import { ArtistWithDuplicates } from "../../lib/pluc_duplicates";
import get_duplicates from "../../lib/pluc_duplicates";
import { PlaylistContext } from "../Contexts/PlaylistContext";
import ArtistDuplicates from "../sandbox/Components/ArtistDuplicates";
import { useContext, useEffect, useState } from "react";

export default function DuplicatesModal({
  is_visible,
  set_visibility,
}: {
  is_visible: Boolean;
  set_visibility: Function;
}) {
  const { tracks, setTracks } = useContext(PlaylistContext);
  const [duplicateResults, setDuplicateResults] = useState<
    ArtistWithDuplicates[]
  >([]);

  useEffect(() => {
    const artists_with_duplicates = get_duplicates(tracks);
    setDuplicateResults(artists_with_duplicates);
    set_visibility(true);
  }, [tracks]);

  function handle_click() {
    set_visibility(false);
  }

  if (!is_visible) {
    return <></>;
  }

  return (
    <div className="mx-20 flex flex-col items-center justify-center gap-10 rounded-xl bg-gray px-20 pb-20 pt-5">
      <div className="flex w-full justify-end">
        <button
          onClick={handle_click}
          className="h-10 w-10 rounded-full bg-gray-light bg-opacity-20 text-xl duration-200 ease-in-out hover:bg-opacity-40"
        >
          ✖
        </button>
      </div>
      {duplicateResults.length ? (
        duplicateResults.map(
          ({ artist, tracks_with_duplicates, total_duplicates }, idx) => {
            return (
              <ArtistDuplicates
                key={idx}
                artist_name={artist.name}
                artist_image={artist.image}
                tracks_with_duplicates={tracks_with_duplicates}
                total_duplicates={total_duplicates}
              />
            );
          }
        )
      ) : (
        <p>No duplicates found!</p>
      )}
    </div>
  );
}
