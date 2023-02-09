'use client';

import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import DuplicatesModal from './DuplicatesModal';
import { PlaylistContext } from '../Contexts/PlaylistContext';
import { PlaylistTrack, Track, SimplifiedPlaylist } from 'spotify-types';

import Login from './Login';
import Search from './Search';

export default function SearchOrLogin() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<PlaylistTrack[]>([]);
  const [searchResults, setSearchResults] = useState<SimplifiedPlaylist[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  return session ? (
    <PlaylistContext.Provider
      value={{
        tracks: tracks,
        setTracks: setTracks,
        searchResults: searchResults,
        setSearchResults: setSearchResults,
      }}
    >
      <DuplicatesModal is_visible={modalVisible} set_visibility={setModalVisible} />
      {!modalVisible && <Search />}
    </PlaylistContext.Provider>
  ) : (
    <Login />
  );
}
