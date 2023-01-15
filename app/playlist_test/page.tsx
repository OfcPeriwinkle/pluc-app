// TODO: remove once testing is done
import test_json from '../../playlist_results.json';

import PlaylistCard from '../Components/PlaylistCard';

export default function PlaylistTest() {
  const processed_playlists = test_json.playlists.items.map((playlist) => {
    return {
      playlist_image_url: playlist.images[0].url,
      playlist_name: playlist.name,
      display_name: playlist.owner.display_name,
    };
  });

  return (
    <>
      {processed_playlists.map((playlist_details) => {
        return (
          <PlaylistCard
            key={playlist_details.playlist_name}
            playlist_image_url={playlist_details.playlist_image_url}
            playlist_name={playlist_details.playlist_name}
            user_display_name={playlist_details.display_name}
          ></PlaylistCard>
        );
      })}
    </>
  );
}
