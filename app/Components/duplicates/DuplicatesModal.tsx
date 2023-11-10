'use client';

import getDuplicates, {
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

async function mergeArtistDetails(
  artistDuplicates: SimplifiedArtistWithDuplicates[]
) {
  const artistIDs = artistDuplicates.map(({ artistID }) => artistID);

  const res = await fetch(
    `/api/artist_details?${new URLSearchParams({ q: artistIDs.join(',') })}`
  );

  if (!res.ok) {
    alert('Error getting artist details');
    return;
  }

  const { artists } = await res.json();

  const artistWithDuplicates = artistDuplicates.map(
    ({ tracksWithDuplicates, totalDuplicates }, idx) => {
      return {
        artist: {
          name: artists[idx].name,
          image: artists[idx].images.length ? artists[idx].images[0].url : null,
        },
        tracksWithDuplicates,
        totalDuplicates,
      };
    }
  );

  return new Promise<ArtistWithDuplicates[]>((resolve) =>
    resolve(artistWithDuplicates)
  );
}

export default function DuplicatesModal({
  isVisible,
  setVisibility,
}: {
  isVisible: Boolean;
  setVisibility: Function;
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
    const artistDuplicates = getDuplicates(tracks);

    if (!artistDuplicates.length) {
      setDuplicateResults([]);
      setVisibility(tracks.length > 0);
      return;
    }

    mergeArtistDetails(artistDuplicates).then((artistWithDuplicates) => {
      if (!artistWithDuplicates) return;

      setDuplicateResults(artistWithDuplicates);
      setVisibility(tracks.length > 0);
    });
  }, [tracks]);

  // Handle the back button
  function handleClick() {
    setVisibility(false);
  }

  if (!isVisible) {
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
            onClick={handleClick}
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
            ({ artist, tracksWithDuplicates, totalDuplicates }, idx) => {
              return (
                <ArtistDuplicates
                  key={idx}
                  artistName={artist.name}
                  artistImage={artist.image}
                  tracksWithDuplicates={tracksWithDuplicates}
                  totalDuplicates={totalDuplicates}
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
