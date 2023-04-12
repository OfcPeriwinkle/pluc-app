'use client';

import { Dialog } from '@headlessui/react';
import { useContext } from 'react';
import { TrackRemovalContext } from '../../Contexts/TrackRemovalContext';
import { PlaylistContext } from '../../Contexts/PlaylistContext';

export default function RemoveModal() {
  const { playlistID, ownerID, userID, tracks, setTracks } =
    useContext(PlaylistContext);
  const { modalOpen, setModalOpen, track, setTrack } =
    useContext(TrackRemovalContext);

  async function handle_remove(e: React.MouseEvent<HTMLButtonElement>) {
    if (ownerID !== userID) {
      alert('You must be the owner of the playlist to remove tracks.');
      return;
    }

    try {
      const res = await fetch('/api/remove_track', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          track_id: track?.id,
          playlist_id: playlistID,
        }),
      });
    } catch {
      alert('Error removing track.');
      return;
    }

    // Remove track from local state
    const new_tracks = tracks.filter((t) => t.track?.id !== track?.id);
    setTracks(new_tracks);
    setTrack(null);
    setModalOpen(false);
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-gray p-4">
          <Dialog.Title className="text-xl font-semibold">
            Remove track?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-lg text-gray-light">
            This will permanently remove "{track?.name}" from your playlist.
          </Dialog.Description>

          <div className="mt-4 flex flex-col justify-around gap-4 sm:flex-row">
            <button
              disabled={ownerID !== userID}
              className={`h-11 rounded-full ${
                ownerID === userID
                  ? 'bg-red-600 hover:scale-105'
                  : 'bg-gray-light bg-opacity-25'
              } font-semibold duration-200 ease-in-out sm:h-12 sm:w-40`}
              onClick={(e) => handle_remove(e)}
            >
              Remove
            </button>
            <button
              className="h-11 rounded-full border-2 border-white font-semibold duration-200 ease-in-out hover:scale-105 hover:bg-gray-light hover:bg-opacity-25 sm:h-12 sm:w-40"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
