import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim().slice(0, 40);
  if (q.length < 2) return Response.json([]);
  const r = await prisma.product.findMany({ where: { active: true, name: { contains: q } }, select: { slug: true, name: true }, take: 6 });
  return Response.json(r);
}
