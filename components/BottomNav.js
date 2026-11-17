"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const I = {
  "/": "M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  "/shop": "M4 7h16l-1 12H5zM8 7a4 4 0 018 0",
  "/blog": "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  "/cart": "M3 4h2l2.5 11h10L20 7H6.5M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  "/track-order": "M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
};
const tabs = [["/", "خانه"], ["/shop", "فروشگاه"], ["/blog", "مجله"], ["/cart", "سبد خرید"], ["/track-order", "پیگیری"]];
export default function BottomNav() {
  const p = usePathname();
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 flex border-t border-beige bg-white md:hidden">
      {tabs.map(([h, t]) => {
        const on = h === "/" ? p === "/" : p.startsWith(h);
        return (
          <Link key={h} href={h} className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] ${on ? "text-olive font-bold" : "text-wood/80"}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={I[h]} /></svg>{t}
          </Link>
        );
      })}
    </nav>
  );
}
