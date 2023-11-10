import { searchForPlaylist } from '../../lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // Verify session
  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  // Extract playlistName from query string and check validity
  const {
    query: { q: playlistName },
  } = req;

  if (!playlistName || typeof playlistName !== 'string') {
    return res.status(400).json({ error: 'No valid playlist name recieved' });
  }

  // Search for playlist name
  const searchResults = await searchForPlaylist(
    session.access_token,
    playlistName
  );
  return res.status(200).json(searchResults);
}
