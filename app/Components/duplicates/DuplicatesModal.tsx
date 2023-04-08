'use client';

import get_duplicates from '../../../lib/pluc_duplicates';
import { ArtistWithDuplicates } from '../../../lib/pluc_duplicates';
import { PlaylistContext } from '../../Contexts/PlaylistContext';
import ArtistDuplicates from './ArtistDuplicates';
import { useContext, useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import FeedbackModal from '../overlays/FeedbackModal';

export default function DuplicatesModal({
  is_visible,
  set_visibility,
}: {
  is_visible: Boolean;
  set_visibility: Function;
}) {
  const { tracks, setTracks } = useContext(PlaylistContext);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [duplicateResults, setDuplicateResults] = useState<
    ArtistWithDuplicates[]
  >([]);

  useEffect(() => {
    if (!tracks.length) {
      return;
    }

    // TODO: Make sure we aren't hitting a size limit

    fetch('/api/playlist_duplicates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playlist_tracks: tracks }),
    })
      .then((res) => {
        if (res.status === 413) {
          alert('Playlist is too large; this will be fixed soon!');
          return;
        }

        if (!res.ok) {
          alert(`Something went wrong! Status: ${res.status}`);
          return;
        }

        res.json().then(({ artists_with_duplicates }) => {
          setDuplicateResults(artists_with_duplicates);
          set_visibility(tracks.length > 0);
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [tracks]);

  function handle_click() {
    set_visibility(false);
  }

  if (!is_visible) {
    return <></>;
  }

  return (
    <>
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
    </>
  );
}
