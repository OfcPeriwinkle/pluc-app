'use client';

import { useSession } from 'next-auth/react';
import DuplicatesModal from './DuplicatesModal';

import Login from './Login';
import Search from './Search';

export default function SearchOrLogin() {
  const { data: session } = useSession();

  return session ? (
    <>
      <Search />
      <DuplicatesModal />
    </>
  ) : (
    <Login />
  );
}
