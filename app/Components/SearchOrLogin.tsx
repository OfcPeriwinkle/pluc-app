'use client';

import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import DuplicatesModal from './DuplicatesModal';
import { PlaylistContext } from '../Contexts/PlaylistContext';
import { PlaylistTrack, Track } from 'spotify-types';

import Login from './Login';
import Search from './Search';

export default function SearchOrLogin() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<PlaylistTrack[]>([]);

  return session ? (
    <PlaylistContext.Provider value={{ tracks: tracks, setTracks: setTracks }}>
      <DuplicatesModal />
      <Search />
    </PlaylistContext.Provider>
  ) : (
    <Login />
  );
}
