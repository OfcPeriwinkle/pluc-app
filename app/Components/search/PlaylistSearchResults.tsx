import PlaylistCard from './PlaylistCard';
import { Suspense } from 'react';
import type { SimplifiedPlaylist } from 'spotify-types/typings/playlist';

export interface PlaylistSearchResultsProps {
  playlists: SimplifiedPlaylist[];
}

export default function PlaylistSearchResults({
  playlists,
}: PlaylistSearchResultsProps) {
  const processed_playlists = playlists.map((playlist) => {
    return {
      playlist_id: playlist.id,
      playlist_image_url: playlist.images[0].url,
      playlist_name: playlist.name,
      display_name: playlist.owner.display_name ?? 'No Name',
    };
  });

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {processed_playlists.map((playlist_details, index) => {
        return (
          <PlaylistCard
            key={index}
            playlist_id={playlist_details.playlist_id}
            playlist_image_url={playlist_details.playlist_image_url}
            playlist_name={playlist_details.playlist_name}
            user_display_name={playlist_details.display_name}
          />
        );
      })}
    </div>
  );
}
