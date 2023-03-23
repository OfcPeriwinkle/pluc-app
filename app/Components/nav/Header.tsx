'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  links: { href: string; label: string }[];
}

export default function Header({ links }: HeaderProps) {
  // TODO: if user refreshes on non-home page, this state is incorrect
  // Likely fix: use React context, or lift up the state to layout!
  const [active, setActive] = useState(links[0].href);
  const { data: session } = useSession();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      className={`${
        active === link.href ? 'text-gray bg-green ' : 'text-white hover:text-gray-light'
      } flex justify-center items-center h-full px-4 text-2xl font-bold`}
      onClick={(event) => {
        setActive(link.href);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="flex justify-between items-center w-full h-16 mb-32 border-b-4 border-green">
      <div className="flex justify-start items-center h-full">{items}</div>
      {session && (
        <button
          className="flex justify-center items-center h-full px-4 text-2xl font-bold text-white hover:text-gray-light"
          name="Log Out"
          onClick={() => signOut()}
        >
          log out
        </button>
      )}
    </header>
  );
}
