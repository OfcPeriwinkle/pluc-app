import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
