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
        active === link.href ? 'sm:text-gray sm:bg-green ' : 'text-white hover:text-gray-light'
      } flex justify-center items-center h-full sm:px-4 text-2xl font-bold`}
      onClick={(event) => {
        setActive(link.href);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 flex justify-between items-center w-full h-16 mb-32 border-b-4 border-green bg-gray-dark">
      <nav className="hidden sm:flex justify-start items-center h-full">
        {items}
        {session && (
          <button
            className="flex justify-center items-center h-full px-4 text-2xl font-bold text-white hover:text-gray-light"
            name="Log Out"
            onClick={() => signOut()}
          >
            log out
          </button>
        )}
      </nav>
      {/* Mobile Nav */}
      <nav className="sm:hidden w-full h-full">
        <ul className="flex justify-between items-center h-full w-full px-4 sm:hidden">
          <li className="h-full">{items[0]}</li>
          <li className="flex items-center h-full">
            <button className="h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
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
