import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "./ProductCard";
const SORTS = { new: { createdAt: "desc" }, cheap: { price: "asc" }, exp: { price: "desc" }, best: { sales: "desc" } };
export default async function ProductList({ base, sp, catSlug }) {
  const { q = "", sort = "new", stock = "", per = "12", page = "1" } = sp;
  const pp = [12, 24, 48].includes(Number(per)) ? Number(per) : 12;
  const pg = Math.max(1, Number(page) || 1);
  const min = Number(sp.min) || 0, max = Number(sp.max) || 0;
  const where = {
    active: true,
    ...(q && { name: { contains: q } }),
    ...(catSlug && { category: { slug: catSlug } }),
    ...(sp.cat && { category: { slug: sp.cat } }),
    ...(stock && { stock: { gt: 0 } }),
    ...((min || max) && { price: { ...(min && { gte: min }), ...(max && { lte: max }) } }),
  };
  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy: SORTS[sort] || SORTS.new, skip: (pg - 1) * pp, take: pp }),
    prisma.product.count({ where }),
  ]);
  const pages = Math.ceil(total / pp);
  const link = (n) => { const u = new URLSearchParams({ ...sp, page: n }); return `${base}?${u}`; };
  const cats = catSlug ? [] : await prisma.category.findMany({ orderBy: { sort: "asc" } });
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <form action={base} className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-beige bg-white p-4 text-sm">
        <input name="q" defaultValue={q} placeholder="نام محصول" className="rounded border border-beige p-2" />
        {!catSlug && <select name="cat" defaultValue={sp.cat || ""} className="rounded border border-beige p-2"><option value="">همهٔ دسته‌ها</option>{cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}</select>}
        <input name="min" type="number" defaultValue={sp.min} placeholder="حداقل قیمت" className="w-28 rounded border border-beige p-2" />
        <input name="max" type="number" defaultValue={sp.max} placeholder="حداکثر قیمت" className="w-28 rounded border border-beige p-2" />
        <select name="sort" defaultValue={sort} className="rounded border border-beige p-2">
          <option value="new">جدیدترین</option><option value="cheap">ارزان‌ترین</option><option value="exp">گران‌ترین</option><option value="best">پرفروش‌ترین</option>
        </select>
        <select name="per" defaultValue={String(pp)} className="rounded border border-beige p-2"><option>12</option><option>24</option><option>48</option></select>
        <label className="flex items-center gap-1"><input type="checkbox" name="stock" value="1" defaultChecked={!!stock} />فقط موجود</label>
        <button className="btn">اعمال</button>
      </form>
      {items.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="py-10 text-center text-wood">محصولی با این مشخصات پیدا نشد.</p>}
      {pages > 1 && <div className="mt-8 flex justify-center gap-2">{Array.from({ length: pages }, (_, i) => <Link key={i} href={link(i + 1)} className={`rounded border px-3 py-1 ${pg === i + 1 ? "bg-olive text-cream" : "border-beige bg-white"}`}>{(i + 1).toLocaleString("fa-IR")}</Link>)}</div>}
    </div>
  );
}
