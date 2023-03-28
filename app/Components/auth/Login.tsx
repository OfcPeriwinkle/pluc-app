'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
      <button
        className="flex h-12 w-full items-center justify-center rounded-full bg-green px-6 font-semibold duration-200 ease-in-out hover:scale-105 focus:scale-95 sm:w-auto"
        onClick={() => {
          signIn('spotify');
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
