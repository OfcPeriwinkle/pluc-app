'use client';

import ArtistDuplicates from '../sandbox/Components/ArtistDuplicates';
import duplicate_results from '../../duplicate_results.json';
import { ArtistWithDuplicates } from '../../lib/pluc_duplicates';
import { useContext, useEffect, useState } from 'react';
import { PlaylistContext } from '../Contexts/PlaylistContext';
import get_duplicates from '../../lib/pluc_duplicates';

export default function DuplicatesModal() {
  const { tracks, setTracks } = useContext(PlaylistContext);
  const [visible, setVisible] = useState(false);
  const [duplicateResults, setDuplicateResults] = useState<ArtistWithDuplicates[]>([]);

  useEffect(() => {
    const artists_with_duplicates = get_duplicates(tracks);
    setDuplicateResults(artists_with_duplicates);
  }, [tracks]);

  return (
    <div className="mx-20 flex flex-col items-center justify-center gap-10 rounded-xl bg-gray px-20 pb-20 pt-20">
      {duplicateResults.map(({ artist, tracks_with_duplicates, total_duplicates }, idx) => {
        return (
          <ArtistDuplicates
            key={idx}
            artist_name={artist.name}
            artist_image={artist.image}
            tracks_with_duplicates={tracks_with_duplicates}
            total_duplicates={total_duplicates}
          />
        );
      })}
    </div>
  );
}
