import Link from "next/link";
import CartCount from "./CartCount";
import SearchBox from "./SearchBox";
const links = [["/", "خانه"], ["/shop", "فروشگاه"], ["/blog", "مجله"], ["/faq", "سوالات متداول"], ["/contact", "تماس با ما"], ["/track-order", "پیگیری سفارش"]];
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-beige bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-3 py-2 md:px-4 md:py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-olive">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#647C51" strokeWidth="1.6"><path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z" /><path d="M5 19 14 10" /></svg>ماهان عطر
        </Link>
        <nav className="hidden gap-5 text-sm text-olive md:flex">{links.map(([h, t]) => <Link key={h} href={h} className="hover:text-herb">{t}</Link>)}</nav>
        <Link href="/cart" className="mr-auto hidden rounded-full bg-olive px-4 py-2 text-sm text-cream md:block"><CartCount /></Link>
        <div className="order-last w-full md:order-none md:w-72"><SearchBox /></div>
      </div>
    </header>
  );
}
