import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const u = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [p, c, a] = await Promise.all([prisma.product.findMany({ where: { active: true }, select: { slug: true } }), prisma.category.findMany({ select: { slug: true } }), prisma.article.findMany({ where: { published: true }, select: { slug: true } })]);
  return [...["", "/shop", "/blog", "/faq", "/contact", "/about"].map((x) => ({ url: u + x })), ...p.map((x) => ({ url: `${u}/product/${x.slug}` })), ...c.map((x) => ({ url: `${u}/category/${x.slug}` })), ...a.map((x) => ({ url: `${u}/blog/${x.slug}` }))];
}
