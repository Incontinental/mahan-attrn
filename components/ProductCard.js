import Link from "next/link";
import Thumb from "./Thumb";
import { fa } from "@/lib/db";
const Badge = ({ children, c = "bg-herb/15 text-olive" }) => <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c}`}>{children}</span>;
export default function ProductCard({ p }) {
  const out = p.stock <= 0;
  return (
    <Link href={`/product/${p.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-herb/15 bg-white shadow-sm transition active:scale-[.98] md:hover:border-gold">
      <div className="relative aspect-square overflow-hidden"><Thumb src={p.imageUrl} alt={p.name} />
        <div className="absolute right-2 top-2 flex flex-col items-start gap-1">
          {p.featured && <Badge>محصول منتخب</Badge>}{p.salePrice && <Badge c="bg-gold/90 text-olive">تخفیف</Badge>}{p.isNew && <Badge c="bg-olive text-cream">جدید</Badge>}
        </div>
        {out && <div className="absolute inset-0 flex items-center justify-center bg-white/70 font-bold text-red-700">ناموجود</div>}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-[2.6rem] text-sm font-bold text-olive">{p.name}</h3>
        <div className="my-2 text-sm text-herb">
          {p.salePrice ? <><s className="ml-1 text-xs text-wood/60">{fa(p.price)}</s><b>{fa(p.salePrice)}</b></> : <b>{fa(p.price)}</b>} <span className="text-xs">تومان</span>
        </div>
        <div className="mt-auto rounded-xl bg-olive py-2 text-center text-sm text-cream">مشاهده و خرید</div>
      </div>
    </Link>
  );
}
