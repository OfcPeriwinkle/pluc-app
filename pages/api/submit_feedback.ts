import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MongoClient, ServerApiVersion } from 'mongodb';

export default async function submit_feedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // Verify session
  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { thumbs_up, message, playlist_id } = req.body;

  if (!thumbs_up || !message || !playlist_id) {
    return res.status(400).json({
      error:
        'Invalid feedback recieved, must have thumbs_up, message, and playlist_id',
    });
  }

  if (process.env.MONGODB_URI === undefined) {
    return res.status(500).json({ error: 'No database connection URI' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
  } catch (err) {
    await client.close();
    return res.status(500).json({ error: 'Failed to connect to database' });
  }

  try {
    const collection = client.db('feedback').collection('duplicate_detection');
    const insert_res = await collection.insertOne({
      thumbs_up,
      message,
      playlist_id,
    });
  } catch (err) {
    await client.close();
    return res.status(500).json({ error: 'Failed to insert feedback' });
  }

  return res.status(200).json({ success: true });
}
