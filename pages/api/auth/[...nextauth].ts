import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

// TODO: throw error if env variables are undefined
export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID ?? "no_id",
      clientSecret: process.env.SPOTIFY_SECRET ?? "no_secret",
      authorization:
        "https://accounts.spotify.com/authorize?scope=playlist-modify-private",
    }),
  ],
};

export default NextAuth(authOptions);
