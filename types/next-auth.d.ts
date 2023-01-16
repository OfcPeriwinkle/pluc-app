import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    user_id?: string;
  }
}
