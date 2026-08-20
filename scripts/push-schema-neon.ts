/**
 * Apply schema via Neon serverless (WebSocket/HTTP).
 * Use when `prisma db push` fails with P1001 (TCP 5432 blocked).
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const url = process.env.DATABASE_URL;
if (!url || url.includes("USER:PASSWORD")) {
  console.error("Set DATABASE_URL in .env first.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  await sql`SELECT 1 AS ok`;
  console.log("Connected to Neon (serverless).");

  const migrationPath = resolve(
    "prisma/migrations/20260820100000_portfolio_only/migration.sql",
  );
  const raw = readFileSync(migrationPath, "utf8");

  const statements = raw
    .split(";")
    .map((s) =>
      s
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter(Boolean);

  for (const statement of statements) {
    const preview = statement.slice(0, 60).replace(/\s+/g, " ");
    try {
      await sql.query(statement);
      console.log(`OK  ${preview}…`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (/already exists/i.test(message) || /duplicate/i.test(message)) {
        console.log(`SKIP ${preview}…`);
        continue;
      }
      console.error(`FAIL ${preview}…`);
      throw error;
    }
  }

  console.log("Schema applied. Next: npm run db:seed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
