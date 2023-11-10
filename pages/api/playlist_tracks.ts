import { getPlaylistTracks } from '../../lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const {
    query: { id: playlistID },
  } = req;

  if (!playlistID || typeof playlistID !== 'string') {
    return res.status(400).json({ error: 'No valid playlist ID recieved' });
  }

  const playlistTracks = await getPlaylistTracks(
    session.access_token,
    playlistID
  );
  return res.status(200).json(playlistTracks);
}
