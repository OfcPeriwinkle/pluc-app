import type { SimplifiedPlaylist } from 'spotify-types/typings/playlist';

import PlaylistCard from './PlaylistCard';

export interface PlaylistSearchResultsProps {
  playlists: SimplifiedPlaylist[];
}

export default function PlaylistSearchResults({ playlists }: PlaylistSearchResultsProps) {
  const processed_playlists = playlists.map((playlist) => {
    return {
      playlist_image_url: playlist.images[0].url,
      playlist_name: playlist.name,
      display_name: playlist.owner.display_name ?? 'No Name',
    };
  });

  return (
    <div className="flex flex-wrap justify-center items-center gap-10 p-14">
      {processed_playlists.map((playlist_details, index) => {
        return (
          <PlaylistCard
            key={index}
            playlist_image_url={playlist_details.playlist_image_url}
            playlist_name={playlist_details.playlist_name}
            user_display_name={playlist_details.display_name}
          ></PlaylistCard>
        );
      })}
    </div>
  );
}
