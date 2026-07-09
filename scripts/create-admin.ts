/**
 * One-time script to seed the first admin user.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/create-admin.ts
 *
 * Make sure DATABASE_URL is set in your environment before running.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../lib/security";

function createDb() {
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const db = createDb();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@y2.com";
  const password = process.env.ADMIN_PASSWORD ?? "y2-strong-password";
  const name = process.env.ADMIN_NAME ?? "Ahmed";

  const existing = await db.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin with email "${email}" already exists. Skipping.`);
    return;
  }

  await db.adminUser.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
      role: "admin",
    },
  });

  console.log(`✅  Admin user created: ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
