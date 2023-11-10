import { getUserDetails } from '../../lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session?.access_token) {
    return res
      .status(401)
      .json({ error: 'Session does not have valid access_token' });
  }

  const userDetails = await getUserDetails(session.access_token);
  return res.status(200).json({ user: userDetails });
}
