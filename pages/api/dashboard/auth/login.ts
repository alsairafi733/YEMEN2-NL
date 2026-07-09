import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createAccessToken } from "@/lib/security";

interface LoginRequest {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ detail: "Invalid credentials" });
  }

  const token = createAccessToken({ sub: user.email, role: user.role });
  return res.status(200).json({ access_token: token, token_type: "bearer" });
}
