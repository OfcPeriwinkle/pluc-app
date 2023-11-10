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
  const [playlistID, setPlaylistID] = useState('');
  const [ownerID, setOwnerID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return session ? (
    <PlaylistContext.Provider
      value={{
        playlistID,
        setPlaylistID,
        ownerID,
        setOwnerID,
        userID: session.user?.name ?? '',
        tracks,
        setTracks,
        searchResults,
        setSearchResults,
      }}
    >
      <DuplicatesModal
        isVisible={modalVisible}
        setVisibility={setModalVisible}
      />
      {!modalVisible && <Search />}
    </PlaylistContext.Provider>
  ) : (
    <Login />
  );
}
