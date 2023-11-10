import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { removeTracks } from '../../lib/spotify';

export default async function remove_track(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { trackID, playlistID } = req.body;

  if (!trackID || !playlistID) {
    return res.status(400).json({ error: 'Missing trackID and/or playlistID' });
  }

  try {
    const snapshot_id = await removeTracks(session.access_token, playlistID, [
      trackID,
    ]);
  } catch (err) {
    return res.status(500).json({
      error: `Failed to remove track from playlist`,
    });
  }

  return res.status(200).json({ success: true });
}
