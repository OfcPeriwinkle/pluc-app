import { PlaylistContext } from '../../Contexts/PlaylistContext';
import Image from 'next/image';
import { useContext } from 'react';
import { PlaylistTrack } from 'spotify-types';

export interface PlaylistCardProps {
  playlist_id: string;
  playlist_image_url: string;
  playlist_name: string;
  user_display_name: string;
}

export default function PlaylistCard({
  playlist_id,
  playlist_image_url,
  playlist_name,
  user_display_name,
}: PlaylistCardProps) {
  const { tracks, setTracks } = useContext(PlaylistContext);

  async function handle_click() {
    const res = await fetch(`/api/playlist_tracks?id=${playlist_id}`);

    if (res.status !== 200) {
      return null;
    }

    const playlist_tracks = (await res.json()) as PlaylistTrack[];
    setTracks(playlist_tracks);
  }

  return (
    <div>
      <button
        className="flex w-52 flex-col items-center justify-center rounded-lg bg-gray-light bg-opacity-5 p-4 transition duration-200 ease-in-out hover:bg-opacity-25 focus:scale-95 focus:bg-opacity-25"
        name={`${playlist_name} by ${user_display_name}`}
        type="button"
        onClick={handle_click}
      >
        <Image
          src={playlist_image_url}
          width={160}
          height={160}
          alt="Playlist Image"
          className="h-44 w-44 object-cover"
        />
        <section className="mt-2 w-full truncate text-start">
          <h3 className="w-full truncate font-semibold">{playlist_name}</h3>
          <p className="w-full truncate text-gray-light">{user_display_name}</p>
        </section>
      </button>
    </div>
  );
}
