import { prisma, fa } from "@/lib/db";
import { STATUS, FLOW } from "@/lib/config";
export const dynamic = "force-dynamic";
export const metadata = { title: "پیگیری سفارش | ماهان عطر" };
export default async function Track({ searchParams }) {
  const number = (searchParams.number || "").trim().toUpperCase(), phone = (searchParams.phone || "").trim();
  const o = number && phone ? await prisma.order.findFirst({ where: { number, shipPhone: phone }, include: { items: { include: { product: true } } } }) : null;
  const idx = o ? FLOW.indexOf(o.status) : -1;
  return (
    <div className="mx-auto max-w-2xl px-3 py-6 md:px-4">
      <h1 className="mb-4 text-2xl font-bold text-olive md:text-3xl">پیگیری سفارش</h1>
      <form className="space-y-3 rounded-2xl bg-white p-4">
        <input name="number" defaultValue={number} placeholder="شمارهٔ سفارش" className="inp" required />
        <input name="phone" defaultValue={phone} placeholder="شمارهٔ موبایل ثبت‌شده" className="inp" required />
        <button className="btn w-full">مشاهدهٔ وضعیت</button>
      </form>
      {number && phone && !o && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">سفارشی با این مشخصات پیدا نشد.</p>}
      {o && (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-white p-4"><p className="text-sm text-wood">شمارهٔ سفارش</p><b className="text-lg text-olive" dir="ltr">{o.number}</b>
            {o.trackingCode && <p className="mt-2 text-sm">کد رهگیری: <b>{o.trackingCode}</b></p>}
            {o.status === "PENDING_PAYMENT" && <p className="mt-3 rounded-xl bg-beige p-3 text-xs leading-6">پرداخت این سفارش هنوز انجام نشده است.</p>}
          </div>
          {o.status === "CANCELED" ? <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-700">{STATUS.CANCELED}</p> : (
            <ol className="rounded-2xl bg-white p-4">
              {FLOW.map((s, i) => <li key={s} className={`flex items-center gap-3 py-2 text-sm ${i <= idx ? "font-bold text-olive" : "text-wood/50"}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${i <= idx ? "bg-herb text-white" : "bg-beige"}`}>{i <= idx ? "✓" : fa(i + 1)}</span>{STATUS[s]}</li>)}
            </ol>
          )}
          <div className="space-y-2 rounded-2xl bg-white p-4 text-sm">
            {o.items.map((i) => <div key={i.id} className="flex justify-between"><span>{i.product.name} {i.variantLabel && `(${i.variantLabel})`} × {fa(i.qty)}</span><span>{fa(i.unitPrice * i.qty)}</span></div>)}
            <div className="flex justify-between border-t border-beige pt-2 font-bold text-olive"><span>مبلغ کل (تومان)</span><span>{fa(o.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
