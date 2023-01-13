"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button
        className="rounded-full bg-green font-medium text-xl p-4 hover:scale-105"
        onClick={() => {
          signIn("spotify");
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
