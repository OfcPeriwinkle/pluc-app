import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const scopes: string[] = ["user-read-email", "user-library-read"];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(",")}`,
    }),
  ],
});
