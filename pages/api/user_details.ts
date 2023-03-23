import { get_user_details } from "../../lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  console.log("Handling user_details request!");

  if (!session?.access_token) {
    return res
      .status(401)
      .json({ error: "Session does not have valid access_token" });
  }

  const user_details = await get_user_details(session.access_token);
  return res.status(200).json({ user: user_details });
}
