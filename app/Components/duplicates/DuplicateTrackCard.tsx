'use client';

import Image from 'next/image';
import { Track } from 'spotify-types';
import { useContext } from 'react';
import { TrackRemovalContext } from '../../Contexts/TrackRemovalContext';
import { PlaylistContext } from '../../Contexts/PlaylistContext';

export default function DuplicateTrackCard({ track }: { track: Track }) {
  const { setModalOpen, setTrack } = useContext(TrackRemovalContext);
  const { tracks } = useContext(PlaylistContext);
  const image = track.album.images[0];

  // TODO: Send playlist tracks so we don't have to filter; also, this might break
  // if the track is a traditional duplicate (same track ids)
  const matchingTracks = tracks.filter((t) => t.track?.id === track.id);
  let date = null;

  if (matchingTracks.length >= 1) {
    const playlistTrack = matchingTracks[0];
    date = playlistTrack.added_at ? new Date(playlistTrack.added_at) : null;
  }

  function handleClick() {
    setTrack(track);
    setModalOpen(true);
  }

  return (
    <>
      <button
        className="flex w-full flex-col items-center justify-center rounded-md bg-gray bg-opacity-25 p-4 duration-200 ease-in-out hover:bg-opacity-100 focus:scale-95 sm:w-64 sm:bg-gray-light sm:bg-opacity-10 sm:p-4 sm:hover:bg-opacity-25"
        onClick={handleClick}
      >
        <Image
          unoptimized
          src={image.url}
          alt={`${track.album.name} Artwork`}
          width={160}
          height={160}
          className="h-36 w-36 object-contain sm:h-56 sm:w-56"
        />
        <section className="mt-2 w-full text-start">
          <h3 className="mt-2 w-full truncate font-semibold sm:text-lg">
            {track.name}
          </h3>
          <p className="mt-2 w-full truncate text-gray-light sm:text-lg">
            {track.album.name}
          </p>
          <p className="mt-2 w-full truncate text-gray-light sm:text-lg">
            {date?.toLocaleDateString()}
          </p>
        </section>
      </button>
    </>
  );
}
