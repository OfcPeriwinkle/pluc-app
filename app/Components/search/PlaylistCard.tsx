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
    <div className="group flex min-w-fit max-w-fit flex-col items-center justify-center gap-6 rounded-xl bg-gray-light bg-opacity-10 p-6 shadow-xl duration-150 ease-in-out hover:bg-opacity-20">
      <div className="flex w-full flex-row items-center justify-evenly gap-6">
        <Image
          src={playlist_image_url}
          width={160}
          height={160}
          alt="Playlist Image"
          className="bightness-75 h-40 w-40 rounded-xl object-cover group-hover:shadow-xl group-hover:brightness-100 "
        />
        <div>
          <h1 className="max-w-md truncate text-ellipsis text-3xl font-semibold text-white">
            {playlist_name}
          </h1>
          <h3 className="max-w-md truncate text-ellipsis text-xl font-medium text-gray-light">
            by {user_display_name}
          </h3>
        </div>
      </div>
      <button
        className="rounded-full bg-green p-4 font-medium text-white duration-150 hover:scale-105 hover:shadow-xl"
        onClick={handle_click}
      >
        Find Duplicates
      </button>
    </div>
  );
}
