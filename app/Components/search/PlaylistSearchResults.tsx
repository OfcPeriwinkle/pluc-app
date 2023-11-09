import PlaylistCard from './PlaylistCard';
import type { SimplifiedPlaylist } from 'spotify-types/typings/playlist';

export interface PlaylistSearchResultsProps {
  playlists: SimplifiedPlaylist[];
}

export default function PlaylistSearchResults({
  playlists,
}: PlaylistSearchResultsProps) {
  const processed_playlists = playlists.map((playlist) => {
    return {
      playlistID: playlist.id,
      playlistImageURL: playlist.images[0].url,
      playlistName: playlist.name,
      displayName: playlist.owner.displayName ?? 'No Name',
      ownerID: playlist.owner.id,
    };
  });

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {processed_playlists.map((playlist_details, index) => {
        return (
          <PlaylistCard
            key={index}
            playlistID={playlist_details.playlistID}
            playlistImageURL={playlist_details.playlistImageURL}
            playlistName={playlist_details.playlistName}
            ownerDisplayName={playlist_details.displayName}
            ownerID={playlist_details.ownerID}
          />
        );
      })}
    </div>
  );
}
