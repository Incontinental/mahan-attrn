"use client";
import { useState } from "react";
import { addItem } from "@/lib/cart";
export default function AddToCart({ p, variants = [] }) {
  const [v, setV] = useState(variants[0]?.id ?? 0);
  const [q, setQ] = useState(1);
  const [ok, setOk] = useState(false);
  const vr = variants.find((x) => x.id === Number(v));
  const price = vr ? vr.price : p.salePrice || p.price;
  const out = (vr ? vr.stock : p.stock) <= 0;
  const add = () => { addItem({ key: `${p.id}-${vr?.id || 0}`, id: p.id, variantId: vr?.id || 0, slug: p.slug, name: p.name, label: vr?.label || "", price, qty: q }); setOk(true); setTimeout(() => setOk(false), 2500); };
  return (
    <div className="space-y-3">
      {variants.length > 1 && (
        <select value={v} onChange={(e) => setV(e.target.value)} className="w-full rounded border border-beige bg-white p-2">
          {variants.map((x) => <option key={x.id} value={x.id}>{x.label} — {x.price.toLocaleString("fa-IR")} تومان</option>)}
        </select>
      )}
      <div className="flex items-center gap-3">
        <input type="number" min="1" max="20" value={q} onChange={(e) => setQ(Math.max(1, Math.min(20, Number(e.target.value) || 1)))} className="w-20 rounded border border-beige bg-white p-2 text-center" />
        <button onClick={add} disabled={out} className="btn disabled:opacity-40">{out ? "ناموجود" : "افزودن به سبد خرید"}</button>
      </div>
      {ok && <p className="text-sm text-herb">✓ محصول به سبد خرید اضافه شد. <a href="/cart" className="underline">مشاهدهٔ سبد</a></p>}
    </div>
  );
}
