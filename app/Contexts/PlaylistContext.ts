import { createContext } from 'react';
import { PlaylistTrack, SimplifiedPlaylist, Track } from 'spotify-types';

export const PlaylistContext = createContext<{
  playlistID: string;
  setPlaylistID: Function;
  ownerID: string;
  setOwnerID: Function;
  userID: string;
  tracks: PlaylistTrack[];
  setTracks: Function;

  // TODO: Move search results into a separate context
  searchResults: SimplifiedPlaylist[];
  setSearchResults: Function;
}>({
  playlistID: '',
  setPlaylistID: (playlistID: string) => {},
  ownerID: '',
  setOwnerID: (ownerID: string) => {},
  userID: '',
  tracks: [],
  setTracks: (tracks: Track[]) => {},
  searchResults: [],
  setSearchResults: Function,
});
