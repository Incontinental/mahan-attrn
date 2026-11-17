import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
export const dynamic = "force-dynamic";
const Row = ({ title, items, href }) => items.length ? (
  <section className="mx-auto mt-10 max-w-6xl px-3 md:px-4">
    <div className="mb-4 flex items-end justify-between"><h2 className="text-xl font-bold text-olive md:text-2xl">{title}</h2>{href && <Link href={href} className="text-sm text-herb">همه ←</Link>}</div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
  </section>) : null;
const benefits = [["اطلاعات شفاف", "ترکیبات، نگهداری و هشدار هر محصول در صفحهٔ آن آمده است."], ["خرید راحت از موبایل", "سبد خرید و ثبت سفارش در چند مرحلهٔ کوتاه."], ["پیگیری آنلاین", "با شمارهٔ سفارش و موبایل، وضعیت را ببینید."], ["بدون ادعای درمانی", "اطلاعات آموزشی‌اند و جایگزین مشورت پزشک نیستند."]];
export default async function Home() {
  const act = { active: true };
  const [cats, best, fresh, deals, feat, arts] = await Promise.all([
    prisma.category.findMany({ orderBy: { sort: "asc" } }),
    prisma.product.findMany({ where: act, orderBy: { sales: "desc" }, take: 4 }),
    prisma.product.findMany({ where: act, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.product.findMany({ where: { ...act, salePrice: { not: null } }, take: 4 }),
    prisma.product.findMany({ where: { ...act, featured: true }, take: 4 }),
    prisma.article.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);
  return (
    <>
      <section className="rounded-b-[2rem] bg-olive text-cream md:rounded-b-[3rem]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-24">
          <h1 className="text-3xl font-bold leading-snug md:text-5xl">طبیعت، در عطر و طعم زندگی</h1>
          <p className="mt-4 max-w-xl leading-8 text-beige">ماهان عطر؛ گیاهان دارویی، دمنوش، عرقیات، ادویه و روغن‌های گیاهی با نگاهی به اصالت عطاری ایرانی.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className="btn bg-gold text-olive">مشاهدهٔ محصولات</Link><a href="#cats" className="btn btn-o">دسته‌بندی‌ها</a></div>
        </div>
      </section>
      <section id="cats" className="mx-auto mt-10 max-w-6xl px-3 md:px-4">
        <h2 className="mb-4 text-xl font-bold text-olive md:text-2xl">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cats.map((c) => <Link key={c.id} href={`/category/${c.slug}`} className="rounded-2xl border border-herb/15 bg-white p-4 text-center text-sm font-bold text-olive shadow-sm transition active:scale-[.98] md:hover:bg-beige">
            <svg className="mx-auto mb-2" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#647C51" strokeWidth="1.4"><path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z" /><path d="M5 19 14 10" /></svg>{c.name}</Link>)}
        </div>
      </section>
      <Row title="محصولات منتخب" items={feat} href="/shop" />
      <Row title="پرفروش‌ترین‌ها" items={best} href="/shop?sort=best" />
      <Row title="پیشنهادهای ویژه" items={deals} href="/shop" />
      <Row title="جدیدترین محصولات" items={fresh} href="/shop?sort=new" />
      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-3 md:grid-cols-4 md:px-4">
        {benefits.map(([t, d]) => <div key={t} className="rounded-2xl bg-beige p-4"><b className="text-olive">{t}</b><p className="mt-1 text-xs leading-6 text-wood">{d}</p></div>)}
      </section>
      {arts.length > 0 && <section className="mx-auto mt-12 max-w-6xl px-3 md:px-4">
        <div className="mb-4 flex items-end justify-between"><h2 className="text-xl font-bold text-olive md:text-2xl">از مجله</h2><Link href="/blog" className="text-sm text-herb">همه ←</Link></div>
        <div className="grid gap-3 md:grid-cols-3">{arts.map((a) => <Link key={a.id} href={`/blog/${a.slug}`} className="rounded-2xl border border-herb/15 bg-white p-4"><h3 className="font-bold text-olive">{a.title}</h3><p className="mt-2 text-sm leading-7 text-wood">{a.summary}</p></Link>)}</div>
      </section>}
    </>
  );
}
