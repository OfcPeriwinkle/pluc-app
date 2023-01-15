import { AuthOptions } from 'next-auth';

import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      // TODO: throw error if env variables are undefined
      // TODO: does next-auth use PKCE by default?
      clientId: process.env.SPOTIFY_ID ?? 'no_id',
      clientSecret: process.env.SPOTIFY_SECRET ?? 'no_secret',
      authorization: 'https://accounts.spotify.com/authorize?scope=playlist-modify-private',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // account is only present on the first call
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
