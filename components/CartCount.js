"use client";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
export default function CartCount() {
  const [n, setN] = useState(0);
  useEffect(() => { const u = () => setN(getCart().reduce((s, x) => s + x.qty, 0)); u(); window.addEventListener("cart", u); return () => window.removeEventListener("cart", u); }, []);
  return <span>سبد خرید{n > 0 && <b className="mr-1 rounded-full bg-gold px-2 text-xs text-olive">{n.toLocaleString("fa-IR")}</b>}</span>;
}
