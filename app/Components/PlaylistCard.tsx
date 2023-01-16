import Image from 'next/image';

export interface PlaylistCardProps {
  playlist_image_url: string;
  playlist_name: string;
  user_display_name: string;
}

export default function PlaylistCard({
  playlist_image_url,
  playlist_name,
  user_display_name,
}: PlaylistCardProps) {
  return (
    <div className="group flex flex-col justify-center items-center max-w-fit min-w-fit rounded-xl p-6 gap-6 bg-gray-light shadow-xl bg-opacity-10 hover:bg-opacity-20 ease-in-out duration-150">
      <div className="flex flex-row gap-6 justify-evenly items-center w-full">
        <Image
          src={playlist_image_url}
          width={160}
          height={160}
          alt="Playlist Image"
          className="rounded-xl w-40 h-40 object-cover bightness-75 group-hover:brightness-100 group-hover:shadow-xl "
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
      <button className="rounded-full p-4 bg-green text-white font-medium hover:shadow-xl hover:scale-105 duration-150">
        Find Duplicates
      </button>
    </div>
  );
}
