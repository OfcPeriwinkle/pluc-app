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
        className="flex flex-col justify-center items-center p-4 bg-gray rounded-lg w-52"
        name={`${playlist_name} by ${user_display_name}`}
        type="button"
      >
        <Image
          src={playlist_image_url}
          width={160}
          height={160}
          alt="Playlist Image"
          className="h-44 w-44 object-contain" // object-contain is needed for Spotify approval
        />
        <section className="mt-2 w-full text-start truncate ">
          <h3 className="truncate w-full font-semibold">{playlist_name}</h3>
          <p className="truncate w-full text-gray-light">{user_display_name}</p>
        </section>
      </button>
    </div>
  );
}
