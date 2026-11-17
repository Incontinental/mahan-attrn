import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } });
  return { title: a ? a.seoTitle || `${a.title} | ماهان عطر` : "مقاله", description: a?.seoDesc || a?.summary };
}
export default async function Article({ params }) {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!a || !a.published) notFound();
  const more = await prisma.article.findMany({ where: { published: true, id: { not: a.id } }, take: 3 });
  return (
    <article className="mx-auto max-w-2xl px-4 py-8">
      <p className="mb-2 text-sm text-wood"><Link href="/blog">مجله</Link></p>
      <h1 className="text-2xl font-bold leading-10 text-olive md:text-3xl">{a.title}</h1>
      <p className="mt-2 text-xs text-wood/70">{a.author} · {a.createdAt.toLocaleDateString("fa-IR")}</p>
      <div className="mt-6 space-y-4 leading-8">{a.body.split("\n\n").map((t, i) => <p key={i}>{t}</p>)}</div>
      <p className="mt-8 rounded-xl bg-beige p-3 text-xs leading-6">این مطلب آموزشی است و جایگزین مشورت پزشکی نیست.</p>
      {more.length > 0 && <div className="mt-8"><h2 className="mb-3 font-bold text-olive">مقالات مرتبط</h2><ul className="space-y-2">{more.map((m) => <li key={m.id}><Link href={`/blog/${m.slug}`} className="text-herb underline">{m.title}</Link></li>)}</ul></div>}
    </article>
  );
}
