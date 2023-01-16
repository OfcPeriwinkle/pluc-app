import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { search_for_playlist } from '../../lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // Verify session
  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  // Extract playlist_name from query string and check validity
  const {
    query: { q: playlist_name },
  } = req;

  if (!playlist_name || typeof playlist_name !== 'string') {
    return res.status(400).json({ error: 'No valid playlist name recieved' });
  }

  // Search for playlist name
  const search_results = await search_for_playlist(session.access_token, playlist_name);
  return res.status(200).json(search_results);
}
