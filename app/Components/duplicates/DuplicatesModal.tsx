'use client';

import get_duplicates, {
  SimplifiedArtistWithDuplicates,
} from '../../../lib/pluc_duplicates';
import { ArtistWithDuplicates } from '../../../lib/pluc_duplicates';
import ArtistDuplicates from './ArtistDuplicates';
import { PlaylistContext } from '../../Contexts/PlaylistContext';
import { useContext, useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import FeedbackModal from '../overlays/FeedbackModal';
import { TrackRemovalContext } from '../../Contexts/TrackRemovalContext';
import RemoveModal from '../overlays/RemoveModal';

async function merge_artist_details(
  artist_duplicates: SimplifiedArtistWithDuplicates[]
) {
  const artist_ids = artist_duplicates.map(({ artist_id }) => artist_id);

  const res = await fetch(
    `/api/artist_details?${new URLSearchParams({ q: artist_ids.join(',') })}`
  );

  if (!res.ok) {
    alert('Error getting artist details');
    return;
  }

  const { artists } = await res.json();

  const artist_with_duplicates = artist_duplicates.map(
    ({ tracks_with_duplicates, total_duplicates }, idx) => {
      return {
        artist: {
          name: artists[idx].name,
          image: artists[idx].images.length ? artists[idx].images[0].url : null,
        },
        tracks_with_duplicates,
        total_duplicates,
      };
    }
  );

  return new Promise<ArtistWithDuplicates[]>((resolve) =>
    resolve(artist_with_duplicates)
  );
}

export default function DuplicatesModal({
  is_visible,
  set_visibility,
}: {
  is_visible: Boolean;
  set_visibility: Function;
}) {
  const { tracks } = useContext(PlaylistContext);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [duplicateResults, setDuplicateResults] = useState<
    ArtistWithDuplicates[]
  >([]);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [trackToRemove, setTrackToRemove] = useState(null);

  // Update the duplicate results when the tracks change, this update logic might make sense in
  // a less "side-effecty" way in the future
  useEffect(() => {
    const artist_duplicates = get_duplicates(tracks);

    if (!artist_duplicates.length) {
      setDuplicateResults([]);
      set_visibility(tracks.length > 0);
      return;
    }

    merge_artist_details(artist_duplicates).then((artist_with_duplicates) => {
      if (!artist_with_duplicates) return;

      setDuplicateResults(artist_with_duplicates);
      set_visibility(tracks.length > 0);
    });
  }, [tracks]);

  // Handle the back button
  function handle_click() {
    set_visibility(false);
  }

  if (!is_visible) {
    return <></>;
  }

  return (
    <TrackRemovalContext.Provider
      value={{
        modalOpen: removeModalOpen,
        setModalOpen: setRemoveModalOpen,
        track: trackToRemove,
        setTrack: setTrackToRemove,
      }}
    >
      <FeedbackModal open={feedbackOpen} setOpen={setFeedbackOpen} />
      <section className="mt-10 w-full">
        <nav className="grid grid-cols-3 items-center">
          <button
            name="back"
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-light bg-opacity-10 transition duration-200 ease-in-out hover:bg-opacity-50 sm:h-10 sm:w-10"
            onClick={handle_click}
          >
            <ArrowLeftIcon className="h-10 w-10 sm:h-6 sm:w-6" />
          </button>
          <h2 className="text-center text-2xl font-bold">Results</h2>
          <div className="flex justify-end">
            <button
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-light bg-opacity-10 transition duration-200 ease-in-out hover:bg-opacity-50 sm:h-10 sm:w-10"
              onClick={() => setFeedbackOpen(true)}
              name="feedback"
              type="button"
            >
              <MegaphoneIcon className="h-10 w-10 sm:h-6 sm:w-6" />
            </button>
          </div>
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
          <h2 className="mt-4 w-full text-center text-xl font-semibold">
            No duplicates found!
          </h2>
        )}
      </section>
      <RemoveModal />
    </TrackRemovalContext.Provider>
  );
}
