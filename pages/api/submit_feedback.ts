import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

export default async function submitFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // Verify session
  if (!session || !session.access_token) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { thumbsUp, message, playlistID } = req.body;

  if (
    thumbsUp == undefined ||
    message == undefined ||
    playlistID == undefined
  ) {
    return res.status(400).json({
      error:
        'Invalid feedback recieved, must have thumbsUp, message, and playlistID',
    });
  }

  if (message.length > Number(process.env.MAX_FEEDBACK_LENGTH)) {
    return res.status(400).json({
      error: `Feedback message must be at most ${process.env.MAX_FEEDBACK_LENGTH} characters`,
    });
  }

  if (!process.env.MONGODB_URI) {
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

    // Check if user already submitted feedback for this playlist
    const existing_feedback = await collection.findOne({
      user_id: String(session.user?.name),
      playlist_id: String(playlistID),
    });

    if (existing_feedback) {
      await client.close();
      return res.status(409).json({
        error: 'User has already submitted feedback for this playlist',
      });
    }

    await collection.insertOne({
      pluc_version: String(process.env.PLUC_VERSION),
      timestamp: new Date(),
      user_id: String(session.user?.name),
      playlist_id: String(playlistID),
      thumbs_up: Boolean(thumbsUp),
      message: String(message),
    });
  } catch (err) {
    await client.close();
    return res.status(500).json({ error: 'Failed to insert feedback' });
  }

  return res.status(200).json({ success: true });
}
