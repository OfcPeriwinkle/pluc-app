import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import { AuthOptions } from 'next-auth';
import { get_access_token } from '../../../lib/spotify';

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
        token.expires = Date.now() + account.expires_at! * 1000;
        token.refresh_token = account.refresh_token;
      }

      // Check access token validity
      if (Date.now() < token.expires!) {
        return token;
      } else if (!token.refresh_token) {
        console.log('Access has expired and there is no refresh_token in JWT!');
        return token;
      }

      const { access_token, expires_at, refresh_token } = await get_access_token(
        token.refresh_token
      );

      return { ...token, access_token, expires: expires_at, refresh_token };
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
