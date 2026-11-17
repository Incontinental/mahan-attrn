"use client";
export const getCart = () => { try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; } };
export const saveCart = (c) => { localStorage.setItem("cart", JSON.stringify(c)); window.dispatchEvent(new Event("cart")); };
export const addItem = (it) => {
  const c = getCart(); const e = c.find((x) => x.key === it.key);
  if (e) e.qty += it.qty; else c.push(it);
  saveCart(c);
};
