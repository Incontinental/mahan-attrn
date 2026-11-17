import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductList from "@/components/ProductList";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const c = await prisma.category.findUnique({ where: { slug: params.slug } });
  return { title: c ? `${c.name} | ماهان عطر` : "دسته‌بندی" };
}
export default async function Category({ params, searchParams }) {
  const c = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!c) notFound();
  return (
    <>
      <div className="mx-auto mt-8 max-w-6xl px-4"><h1 className="text-3xl font-bold text-olive">{c.name}</h1>{c.description && <p className="mt-2 text-wood">{c.description}</p>}</div>
      <ProductList base={`/category/${c.slug}`} sp={searchParams} catSlug={c.slug} />
    </>
  );
}
