import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET ?? "SUPER_SECRET_Y2_KEY";
const ALGORITHM = "HS256";
const ACCESS_TOKEN_EXPIRE_MINUTES = 60;

// ─── Password helpers ────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hashed: string): boolean {
  return bcrypt.compareSync(password, hashed);
}

// ─── JWT helpers ─────────────────────────────────────────────────────────────

export interface TokenPayload {
  sub: string;
  role: string;
  exp?: number;
}

export function createAccessToken(
  data: Omit<TokenPayload, "exp">,
  expiresMinutes: number = ACCESS_TOKEN_EXPIRE_MINUTES
): string {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: ALGORITHM,
    expiresIn: expiresMinutes * 60,
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET_KEY, {
    algorithms: [ALGORITHM],
  }) as TokenPayload;
}

// ─── Route protection helper ─────────────────────────────────────────────────

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  admin: TokenPayload
) => Promise<void>;

export function withAdminAuth(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ detail: "Missing or invalid token" });
    }
    const token = authHeader.slice(7);
    try {
      const payload = verifyToken(token);
      if (payload.role !== "admin") {
        return res.status(403).json({ detail: "Not enough permissions" });
      }
      return handler(req, res, payload);
    } catch {
      return res.status(401).json({ detail: "Invalid token" });
    }
  };
}
