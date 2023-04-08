import { get_access_token } from '../../../lib/spotify';
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
      authorization:
        'https://accounts.spotify.com/authorize?scope=playlist-modify-private',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // account is only present on the first call
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.user_id = account.providerAccountId;
      }

      // Check access token validity
      if (
        token.expires_at &&
        Math.floor(Date.now() / 1000) < token.expires_at
      ) {
        return token;
      } else if (!token.refresh_token) {
        console.error(
          'Access has expired and there is no refresh_token in JWT!'
        );
        return token;
      }

      console.log('Refreshing access_token...');
      const { access_token, expires_at, refresh_token } =
        await get_access_token(token.refresh_token);

      return {
        ...token,
        access_token: access_token,
        expires_at: expires_at,
        refresh_token: refresh_token,
      };
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.user.id = token.user_id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
