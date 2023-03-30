'use client';

import { useSession } from 'next-auth/react';
import { signOut, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function MobileMenu() {
  const { data: session } = useSession();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center">
            {({ open }) => {
              if (open) {
                return <XMarkIcon className="h-8 w-8"></XMarkIcon>;
              }

              return <Bars3Icon className="h-8 w-8"></Bars3Icon>;
            }}
          </Popover.Button>

          {open && (
            <div
              className="fixed inset-0 mt-16 bg-black/30"
              aria-hidden="true"
            />
          )}
          <Popover.Panel className="absolute z-10 w-64 -translate-x-56 translate-y-6 rounded-md bg-gray">
            <nav className="flex flex-col items-start justify-center gap-4 rounded-md p-4">
              <a
                href="test"
                className="flex h-11 w-full items-center justify-start p-4 text-xl font-semibold"
              >
                coming soon
              </a>
              <a
                href="test"
                className="flex h-11 w-full items-center justify-start p-4 text-xl font-semibold"
              >
                about
              </a>
              <div className="w-full border-t-2 border-gray-light border-opacity-50">
                {session && (
                  <button
                    className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-green font-semibold"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                )}
                {!session && (
                  <button
                    className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-green font-semibold"
                    onClick={() => signIn('spotify')}
                  >
                    Sign in with Spotify
                  </button>
                )}
              </div>
            </nav>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
