'use client';

import ArtistDuplicates from '../sandbox/Components/ArtistDuplicates';
import duplicate_results from '../../duplicate_results.json';
import { ArtistWithDuplicates } from '../../lib/pluc_duplicates';
import { useContext, useEffect, useState } from 'react';
import { PlaylistContext } from '../Contexts/PlaylistContext';
import get_duplicates from '../../lib/pluc_duplicates';

export default function DuplicatesModal({
  is_visible,
  set_visibility,
}: {
  is_visible: Boolean;
  set_visibility: Function;
}) {
  const { tracks, setTracks } = useContext(PlaylistContext);
  const [duplicateResults, setDuplicateResults] = useState<ArtistWithDuplicates[]>([]);

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
    <div className=" mx-20 flex flex-col items-center justify-center gap-10 rounded-xl bg-gray px-20 pb-20 pt-20">
      <button onClick={handle_click}>X</button>
      {duplicateResults.length ? (
        duplicateResults.map(({ artist, tracks_with_duplicates, total_duplicates }, idx) => {
          return (
            <ArtistDuplicates
              key={idx}
              artist_name={artist.name}
              artist_image={artist.image}
              tracks_with_duplicates={tracks_with_duplicates}
              total_duplicates={total_duplicates}
            />
          );
        })
      ) : (
        <p>No duplicates found!</p>
      )}
    </div>
  );
}
