import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma, fa } from "@/lib/db";
import Thumb from "@/components/Thumb";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const p = await prisma.product.findUnique({ where: { slug: params.slug } });
  return { title: p ? p.seoTitle || `${p.name} | ماهان عطر` : "محصول", description: p?.seoDesc || undefined };
}
const Row = ({ k, v }) => v ? <div className="border-t border-beige py-3"><h3 className="font-bold text-olive">{k}</h3><p className="mt-1 text-sm leading-7">{v}</p></div> : null;
export default async function Product({ params }) {
  const p = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true, variants: true } });
  if (!p || !p.active) notFound();
  const related = await prisma.product.findMany({ where: { categoryId: p.categoryId, id: { not: p.id }, active: true }, take: 4 });
  const plain = { id: p.id, slug: p.slug, name: p.name, price: p.price, salePrice: p.salePrice, stock: p.stock };
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-4 text-sm text-wood"><Link href="/shop">فروشگاه</Link> / <Link href={`/category/${p.category.slug}`}>{p.category.name}</Link></p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg border border-beige"><Thumb src={p.imageUrl} alt={p.name} /></div>
        <div>
          <h1 className="text-3xl font-bold text-olive">{p.name}</h1>
          <div className="my-3 text-lg">{p.salePrice ? <><s className="ml-2 text-sm text-wood/70">{fa(p.price)}</s><b>{fa(p.salePrice)}</b></> : <b>{fa(p.price)}</b>} تومان</div>
          <p className="mb-4 text-sm">{p.stock > 0 ? (p.stock < 5 ? "موجودی محدود" : "موجود") : "ناموجود"}</p>
          <AddToCart p={plain} variants={p.variants.map(({ id, label, price, stock }) => ({ id, label, price, stock }))} />
          <div className="mt-6">
            <Row k="توضیحات" v={p.description} /><Row k="ترکیبات" v={p.ingredients} /><Row k="منطقهٔ تولید" v={p.origin} />
            <Row k="شرایط نگهداری" v={p.storage} /><Row k="هشدارها" v={p.warnings} />
          </div>
        </div>
      </div>
      {related.length > 0 && <section className="mt-12"><h2 className="mb-4 text-xl font-bold text-olive">محصولات مشابه</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>}
    </div>
  );
}
