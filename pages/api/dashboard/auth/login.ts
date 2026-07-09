import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createAccessToken } from "@/lib/security";
import bcrypt from "bcryptjs";

interface LoginRequest {
  email?: unknown;
  password?: unknown;
}

// A dummy hash used to keep response time constant when the user is not found,
// preventing user enumeration via timing attacks.
const DUMMY_HASH = bcrypt.hashSync("dummy", 10);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const { email, password } = (req.body ?? {}) as LoginRequest;

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  // Always run bcrypt to avoid timing-based user enumeration.
  const hashToCheck = user ? user.passwordHash : DUMMY_HASH;
  const passwordValid = await verifyPassword(password, hashToCheck);

  if (!user || !passwordValid) {
    return res.status(401).json({ detail: "Invalid credentials" });
  }

  const token = createAccessToken({ sub: user.email, role: user.role });
  return res.status(200).json({ access_token: token, token_type: "bearer" });
}
