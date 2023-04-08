import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

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

  if (
    thumbs_up == undefined ||
    message == undefined ||
    playlist_id == undefined
  ) {
    return res.status(400).json({
      error:
        'Invalid feedback recieved, must have thumbs_up, message, and playlist_id',
    });
  }

  if (message.length > Number(process.env.MAX_FEEDBACK_LENGTH)) {
    return res.status(400).json({
      error: `Feedback message must be less than ${process.env.MAX_FEEDBACK_LENGTH} characters`,
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

    // TODO: add user_id to feedback and check if user has already submitted feedback for this playlist
    await collection.insertOne({
      pluc_version: String(process.env.PLUC_VERSION),
      timestamp: new Date(),
      user_id: String('test_user_id'),
      playlist_id: String(playlist_id),
      thumbs_up: Boolean(thumbs_up),
      message: String(message),
    });
  } catch (err) {
    await client.close();
    return res.status(500).json({ error: 'Failed to insert feedback' });
  }

  return res.status(200).json({ success: true });
}
