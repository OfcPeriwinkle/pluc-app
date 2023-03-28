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
        active === link.href
          ? 'sm:bg-green sm:text-gray '
          : 'text-white hover:text-gray-light'
      } flex h-full items-center justify-center text-2xl font-bold sm:px-4`}
      onClick={(event) => {
        setActive(link.href);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-10 h-16 w-full border-b-4 border-green bg-gray-dark">
      <nav className="hidden h-full w-full justify-between sm:flex">
        <div className="flex h-full justify-start">{items}</div>
        {session && (
          <button
            className="flex h-full items-center justify-center px-4 text-2xl font-bold text-white hover:text-gray-light"
            name="Log Out"
            onClick={() => signOut()}
          >
            log out
          </button>
        )}
      </nav>
      {/* Mobile Nav */}
      <nav className="h-full w-full sm:hidden">
        <ul className="flex h-full w-full items-center justify-between px-4 sm:hidden">
          <li className="h-full">{items[0]}</li>
          <li className="flex h-full items-center">
            <button className="h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
