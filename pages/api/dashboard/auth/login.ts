import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createAccessToken } from "@/lib/security";

interface LoginRequest {
  email?: unknown;
  password?: unknown;
}

// A pre-computed dummy hash used to keep response time constant when the user
// is not found, preventing user enumeration via timing attacks.
// Generated with: bcrypt.hashSync("dummy-timing-protection", 10)
const DUMMY_HASH =
  "$2b$10$X7v1A1YPdKr2fQfVoOV7J.k6LpJUHmGe0lmRxaGH9HJeK/kBmFKxC";

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
