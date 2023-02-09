import { createContext } from 'react';
import { PlaylistTrack, SimplifiedPlaylist, Track } from 'spotify-types';

export const PlaylistContext = createContext<{
  tracks: PlaylistTrack[];
  setTracks: Function;
  searchResults: SimplifiedPlaylist[];
  setSearchResults: Function;
}>({
  tracks: [],
  setTracks: (tracks: Track[]) => {},
  searchResults: [],
  setSearchResults: Function,
});
