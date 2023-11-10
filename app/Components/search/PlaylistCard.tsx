import { PlaylistContext } from '../../Contexts/PlaylistContext';
import Image from 'next/image';
import { useContext } from 'react';
import { PlaylistTrack } from 'spotify-types';

export interface PlaylistCardProps {
  playlistID: string;
  playlistImageURL: string;
  playlistName: string;
  ownerDisplayName: string;
  ownerID: string;
}

export default function PlaylistCard({
  playlistID,
  playlistImageURL,
  playlistName,
  ownerDisplayName,
  ownerID,
}: PlaylistCardProps) {
  const { setPlaylistID, setTracks, setOwnerID } = useContext(PlaylistContext);

  async function handleClick() {
    const res = await fetch(`/api/playlist_tracks?id=${playlistID}`);

    if (!res.ok) {
      return null;
    }

    const playlistTracks = (await res.json()) as PlaylistTrack[];
    setTracks(playlistTracks);
    setPlaylistID(playlistID);
    setOwnerID(ownerID);
  }

  return (
    <div>
      <button
        className="flex w-52 flex-col items-center justify-center rounded-lg bg-gray-light bg-opacity-5 p-4 transition duration-200 ease-in-out hover:bg-opacity-25 focus:scale-95 focus:bg-opacity-25"
        name={`${playlistName} by ${ownerDisplayName}`}
        type="button"
        onClick={handleClick}
      >
        <Image
          unoptimized
          src={playlistImageURL}
          width={160}
          height={160}
          alt="Playlist Image"
          className="h-44 w-44 object-cover"
        />
        <section className="mt-2 w-full truncate text-start">
          <h3 className="w-full truncate font-semibold">{playlistName}</h3>
          <p className="w-full truncate text-gray-light">{ownerDisplayName}</p>
        </section>
      </button>
    </div>
  );
}
