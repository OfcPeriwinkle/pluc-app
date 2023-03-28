'use client';

import { PlaylistContext } from '../../Contexts/PlaylistContext';
import DuplicatesModal from '../duplicates/DuplicatesModal';
import Search from '../search/Search';
import Login from './Login';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PlaylistTrack, SimplifiedPlaylist } from 'spotify-types';

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
      <DuplicatesModal
        is_visible={modalVisible}
        set_visibility={setModalVisible}
      />
      {!modalVisible && <Search />}
    </PlaylistContext.Provider>
  ) : (
    <Login />
  );
}
