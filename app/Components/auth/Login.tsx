'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
      <button
        className="font-semibold h-12 px-6 rounded-full w-full flex items-center justify-center sm:w-auto bg-green hover:scale-105 focus:scale-95 ease-in-out duration-200"
        onClick={() => {
          signIn('spotify');
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
