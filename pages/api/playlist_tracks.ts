import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { get_playlist_tracks } from '../../lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const {
    query: { id: playlist_id },
  } = req;

  if (!playlist_id || typeof playlist_id !== 'string') {
    return res.status(400).json({ error: 'No valid playlist ID recieved' });
  }

  const playlist_tracks = await get_playlist_tracks(session.access_token, playlist_id);
  return res.status(200).json(playlist_tracks);
}
