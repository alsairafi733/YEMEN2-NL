import type { NextApiRequest, NextApiResponse } from "next";
import { withAdminAuth, type TokenPayload } from "@/lib/security";

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
  _admin: TokenPayload
): Promise<void | NextApiResponse> {
  // TODO: replace with real model list from your data sources
  return res.status(200).json({ models: [] });
}

export default withAdminAuth(handler);
