import Link from "next/link";
import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
export const metadata = { title: "مجله | ماهان عطر" };
export default async function Blog({ searchParams }) {
  const q = (searchParams.q || "").trim();
  const arts = await prisma.article.findMany({ where: { published: true, ...(q && { title: { contains: q } }) }, orderBy: { createdAt: "desc" } });
  return (
    <div className="mx-auto max-w-4xl px-3 py-6 md:px-4">
      <h1 className="mb-4 text-2xl font-bold text-olive md:text-3xl">مجله</h1>
      <form className="mb-5"><input name="q" defaultValue={q} placeholder="جست‌وجو در مقالات" className="inp" /></form>
      {!arts.length && <p>مقاله‌ای پیدا نشد.</p>}
      <div className="grid gap-3 md:grid-cols-2">{arts.map((a) => (
        <Link key={a.id} href={`/blog/${a.slug}`} className="rounded-2xl border border-herb/15 bg-white p-4 transition active:scale-[.98]">
          <h2 className="font-bold text-olive">{a.title}</h2><p className="mt-2 text-sm leading-7 text-wood">{a.summary}</p>
          <p className="mt-3 text-xs text-wood/70">{a.author} · {a.createdAt.toLocaleDateString("fa-IR")}</p>
        </Link>))}</div>
    </div>
  );
}
