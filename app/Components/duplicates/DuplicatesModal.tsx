'use client';

import get_duplicates from '../../../lib/pluc_duplicates';
import { ArtistWithDuplicates } from '../../../lib/pluc_duplicates';
import { PlaylistContext } from '../../Contexts/PlaylistContext';
import ArtistDuplicates from './ArtistDuplicates';
import { useContext, useEffect, useState } from 'react';

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
    get_duplicates(tracks).then((artists_with_duplicates) => {
      setDuplicateResults(artists_with_duplicates);
      set_visibility(tracks.length > 0);
    });
  }, [tracks]);

  function handle_click() {
    set_visibility(false);
  }

  if (!is_visible) {
    return <></>;
  }

  return (
    <section className="mt-10 w-full">
      <nav className="grid grid-cols-3 items-center">
        <button
          name="back"
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light bg-opacity-10 transition duration-200 ease-in-out hover:bg-opacity-50"
          onClick={handle_click}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <h2 className="text-center text-2xl font-bold">Results</h2>
      </nav>
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
    </section>
  );
}
