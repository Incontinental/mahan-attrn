"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCart, saveCart } from "@/lib/cart";
import { SHIPPING_COST, FREE_FROM } from "@/lib/config";
const fa = (n) => n.toLocaleString("fa-IR");
const F = [["name", "نام و نام خانوادگی", "text"], ["phone", "شمارهٔ موبایل", "tel"], ["province", "استان", "text"], ["city", "شهر", "text"], ["postal", "کد پستی (۱۰ رقم)", "tel"]];
export default function Checkout() {
  const r = useRouter();
  const [items, setItems] = useState(null);
  const [f, setF] = useState({ name: "", phone: "", province: "", city: "", line: "", postal: "", note: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => setItems(getCart()), []);
  if (!items) return <p className="p-10 text-center">در حال بارگذاری…</p>;
  if (!items.length) return <p className="p-10 text-center">سبد خرید خالی است. <Link href="/shop" className="underline">فروشگاه</Link></p>;
  const sum = items.reduce((s, x) => s + x.price * x.qty, 0), ship = sum >= FREE_FROM ? 0 : SHIPPING_COST;
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setBusy(true);
    let key = sessionStorage.getItem("ckey"); if (!key) { key = crypto.randomUUID(); sessionStorage.setItem("ckey", key); }
    try {
      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, key, items: items.map((x) => ({ id: x.id, variantId: x.variantId || 0, qty: x.qty })) }) });
      const d = await res.json();
      if (!res.ok) { setErr(d.error || "خطایی رخ داد."); setBusy(false); return; }
      sessionStorage.removeItem("ckey"); saveCart([]);
      r.push(`/track-order?number=${d.number}&phone=${f.phone}`);
    } catch { setErr("ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید."); setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl space-y-4 px-3 py-6 md:px-4">
      <h1 className="text-2xl font-bold text-olive md:text-3xl">تکمیل سفارش</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {F.map(([k, l, t]) => <label key={k} className="text-sm">{l}<input required type={t} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="inp mt-1" /></label>)}
      </div>
      <label className="block text-sm">آدرس کامل<textarea required rows={3} value={f.line} onChange={(e) => setF({ ...f, line: e.target.value })} className="inp mt-1" /></label>
      <label className="block text-sm">توضیحات سفارش (اختیاری)<textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} className="inp mt-1" /></label>
      <div className="space-y-2 rounded-2xl bg-white p-4 text-sm">
        {items.map((x) => <div key={x.key} className="flex justify-between"><span>{x.name} {x.label && `(${x.label})`} × {fa(x.qty)}</span><span>{fa(x.price * x.qty)}</span></div>)}
        <div className="flex justify-between border-t border-beige pt-2"><span>ارسال (نمونه)</span><span>{ship ? fa(ship) : "رایگان"}</span></div>
        <div className="flex justify-between text-base font-bold text-olive"><span>مبلغ نهایی (تومان)</span><span>{fa(sum + ship)}</span></div>
      </div>
      <p className="rounded-xl bg-beige p-3 text-xs leading-6">درگاه پرداخت هنوز متصل نشده است؛ سفارش شما با وضعیت «در انتظار پرداخت» ثبت می‌شود.</p>
      {err && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</p>}
      <button disabled={busy} className="btn w-full disabled:opacity-50">{busy ? "در حال ثبت…" : "ثبت سفارش"}</button>
    </form>
  );
}
