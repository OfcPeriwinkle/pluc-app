import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function remove_track(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Invalid session' });
    return;
  }

  const { track_id, playlist_id } = req.body;

  if (!track_id || !playlist_id) {
    res.status(400).json({ error: 'Missing track_id and/or playlist_id' });
    return;
  }

  res.status(200).json({ success: true });
}
