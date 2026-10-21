import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

function csvCell(value: string): string {
  // Quote every cell; neutralise formulas when opened in Excel / Sheets.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  await requireStudio();
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "asc" },
    select: { email: true, locale: true, createdAt: true },
  });
  const rows = [
    ["email", "language", "subscribed_at"],
    ...subscribers.map((s) => [s.email, s.locale, s.createdAt.toISOString()]),
  ];
  const csv = "﻿" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
