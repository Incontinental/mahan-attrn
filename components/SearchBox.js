"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SearchBox() {
  const [q, setQ] = useState(""); const [r, setR] = useState([]);
  useEffect(() => {
    if (q.trim().length < 2) { setR([]); return; }
    const t = setTimeout(async () => { try { setR(await (await fetch("/api/suggest?q=" + encodeURIComponent(q))).json()); } catch {} }, 250);
    return () => clearTimeout(t);
  }, [q]);
  return (
    <form action="/shop" className="relative w-full">
      <input name="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجوی محصول…" autoComplete="off" className="inp !rounded-full !py-2 pr-4" />
      <button className="absolute left-1 top-1 rounded-full bg-olive px-4 py-1.5 text-sm text-cream">جست‌وجو</button>
      {r.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-beige bg-white shadow-lg">
          {r.map((p) => <li key={p.slug}><Link href={`/product/${p.slug}`} onClick={() => { setR([]); setQ(""); }} className="block px-4 py-3 text-sm hover:bg-cream">{p.name}</Link></li>)}
        </ul>
      )}
    </form>
  );
}
