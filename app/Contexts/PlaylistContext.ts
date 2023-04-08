import { createContext } from 'react';
import { PlaylistTrack, SimplifiedPlaylist, Track } from 'spotify-types';

export const PlaylistContext = createContext<{
  playlistID: string;
  setPlaylistID: Function;
  tracks: PlaylistTrack[];
  setTracks: Function;
  searchResults: SimplifiedPlaylist[];
  setSearchResults: Function;
}>({
  playlistID: '',
  setPlaylistID: (playlist_id: string) => {},
  tracks: [],
  setTracks: (tracks: Track[]) => {},
  searchResults: [],
  setSearchResults: Function,
});
