import { get_artists } from "../../lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // Verify session
  if (!session || !session.access_token) {
    return res.status(401).json({ error: "Invalid session" });
  }

  // Extract artist_list from query string and check validity
  const {
    query: { q: artist_list },
  } = req;

  if (!artist_list || typeof artist_list !== "string") {
    return res.status(400).json({ error: "No valid playlist name recieved" });
  }

  // Search for playlist name
  const search_results = await get_artists(session.access_token, artist_list);
  return res.status(200).json(search_results);
}
