import { NextApiRequest, NextApiResponse } from 'next';
import get_duplicates from '../../lib/pluc_duplicates';
import { get_artists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

// TODO: Temp fix for large request bodies
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function playlist_duplicates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { playlist_tracks } = req.body;

  if (!playlist_tracks) {
    return res.status(400).json({ error: 'Missing playlist_tracks' });
  }

  try {
    const artist_duplicates = await get_duplicates(playlist_tracks);
    const artist_ids = artist_duplicates.map((artist) => artist.artist_id);

    // Fetch artist details
    const artist_details = await get_artists(session.access_token, artist_ids);

    if (!artist_details) {
      return res.status(500).json({ error: 'Failed to fetch artist details' });
    }

    // Merge artist details with duplicates
    const artists_with_duplicates = artist_details.map((artist, idx) => {
      return {
        artist: {
          name: artist.name,
          image: artist.images ? artist.images[0].url : null,
        },
        tracks_with_duplicates: artist_duplicates[idx].tracks_with_duplicates,
        total_duplicates: artist_duplicates[idx].total_duplicates,
      };
    });

    return res.status(200).json({ artists_with_duplicates });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong while detecting duplicates.' });
  }
}
