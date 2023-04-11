import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { remove_tracks } from '../../lib/spotify';

export default async function remove_track(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.access_token) {
    res.status(401).json({ error: 'Invalid session' });
    return;
  }

  const { track_id, playlist_id } = req.body;

  if (!track_id || !playlist_id) {
    return res
      .status(400)
      .json({ error: 'Missing track_id and/or playlist_id' });
  }

  try {
    const snapshot_id = await remove_tracks(session.access_token, playlist_id, [
      track_id,
    ]);
  } catch (err) {
    return res.status(500).json({
      error: `Failed to remove track from playlist`,
    });
  }

  return res.status(200).json({ success: true });
}
