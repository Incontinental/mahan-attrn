"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "@/lib/cart";
import { SHIPPING_COST, FREE_FROM } from "@/lib/config";
const fa = (n) => n.toLocaleString("fa-IR");
export default function Cart() {
  const [items, setItems] = useState(null);
  useEffect(() => setItems(getCart()), []);
  if (!items) return <p className="p-10 text-center">در حال بارگذاری…</p>;
  const set = (c) => { setItems(c); saveCart(c); };
  const qty = (k, d) => set(items.map((x) => x.key === k ? { ...x, qty: Math.max(1, Math.min(20, x.qty + d)) } : x));
  const del = (k) => set(items.filter((x) => x.key !== k));
  const sum = items.reduce((s, x) => s + x.price * x.qty, 0);
  const ship = sum >= FREE_FROM ? 0 : SHIPPING_COST;
  const left = Math.max(0, FREE_FROM - sum);
  return (
    <div className="mx-auto max-w-3xl px-3 py-6 md:px-4">
      <h1 className="mb-4 text-2xl font-bold text-olive md:text-3xl">سبد خرید</h1>
      {!items.length ? <p>سبد خرید شما خالی است. <Link href="/shop" className="underline">رفتن به فروشگاه</Link></p> : (
        <>
          <div className="mb-4 rounded-2xl bg-beige p-3 text-sm">
            {left > 0 ? <>با <b>{fa(left)}</b> تومان خرید بیشتر، ارسال رایگان می‌شود.</> : "ارسال سفارش شما رایگان است."}
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full bg-herb" style={{ width: `${Math.min(100, (sum / FREE_FROM) * 100)}%` }} /></div>
          </div>
          <div className="space-y-3">
            {items.map((x) => (
              <div key={x.key} className="rounded-2xl border border-herb/15 bg-white p-3">
                <div className="flex justify-between gap-2"><div><Link href={`/product/${x.slug}`} className="font-bold text-olive">{x.name}</Link><p className="text-xs text-wood">{x.label}</p></div><button onClick={() => del(x.key)} className="self-start text-sm text-red-700">حذف</button></div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3"><button onClick={() => qty(x.key, -1)} className="h-9 w-9 rounded-full border border-beige text-lg">−</button><span>{fa(x.qty)}</span><button onClick={() => qty(x.key, 1)} className="h-9 w-9 rounded-full border border-beige text-lg">+</button></div>
                  <b>{fa(x.price * x.qty)} تومان</b>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 rounded-2xl bg-white p-4 text-sm">
            <div className="flex justify-between"><span>جمع کالاها</span><span>{fa(sum)} تومان</span></div>
            <div className="flex justify-between"><span>هزینهٔ ارسال (نمونه)</span><span>{ship ? fa(ship) + " تومان" : "رایگان"}</span></div>
            <div className="flex justify-between border-t border-beige pt-2 text-base font-bold text-olive"><span>مبلغ نهایی</span><span>{fa(sum + ship)} تومان</span></div>
          </div>
          <Link href="/checkout" className="btn mt-4 block">ادامهٔ فرایند خرید</Link>
        </>
      )}
    </div>
  );
}
