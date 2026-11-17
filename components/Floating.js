"use client";
import { useEffect, useState } from "react";
export default function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 400); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const chat = process.env.NEXT_PUBLIC_CHAT_URL;
  return (
    <div className="fixed bottom-20 left-3 z-20 flex flex-col gap-3 md:bottom-6">
      {show && <button aria-label="بازگشت به بالا" onClick={() => window.scrollTo({ top: 0 })} className="h-11 w-11 rounded-full border border-beige bg-white text-olive shadow">↑</button>}
      {chat && <a href={chat} target="_blank" rel="noopener noreferrer" aria-label="گفتگو" className="flex h-12 w-12 items-center justify-center rounded-full bg-herb text-xl text-white shadow-lg">💬</a>}
    </div>
  );
}
