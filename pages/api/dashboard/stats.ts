import type { NextApiRequest, NextApiResponse } from "next";
import { withAdminAuth, type TokenPayload } from "@/lib/security";

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
  _admin: TokenPayload
) {
  // TODO: replace with real stats from your data sources
  return res.status(200).json({
    users: 0,
    conversations: 0,
    models_active: 0,
    uptime: process.uptime(),
  });
}

export default withAdminAuth(handler);
