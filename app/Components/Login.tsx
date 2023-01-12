"use client";

import { Dispatch, SetStateAction } from "react";

interface LoginProps {
  hasSignedIn: Dispatch<SetStateAction<boolean>>;
}

function authenticate() {
  // TODO: Spotify authentication!
  return true;
}

export default function Login({ hasSignedIn }: LoginProps) {
  return (
    <div>
      <button
        className="rounded-full bg-green font-medium text-xl p-4 hover:scale-105"
        onClick={(event) => {
          event.preventDefault();
          hasSignedIn(authenticate());
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
