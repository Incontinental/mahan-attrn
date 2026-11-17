import Link from "next/link";
import { contact } from "@/lib/config";
export default function Footer() {
  const c = contact();
  return (
    <footer className="mt-14 rounded-t-[2rem] bg-olive text-beige">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm md:grid-cols-3">
        <div><b className="text-lg text-cream">ماهان عطر</b><p className="mt-2 leading-7">گیاهان دارویی، دمنوش، عرقیات، ادویه و روغن‌های گیاهی</p></div>
        <div className="grid grid-cols-2 gap-1">{[["/shop", "فروشگاه"], ["/blog", "مجله"], ["/faq", "سوالات متداول"], ["/contact", "تماس با ما"], ["/about", "درباره ما"], ["/track-order", "پیگیری سفارش"]].map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</div>
        <div className="space-y-1">{c.phone && <p>تلفن: {c.phone}</p>}{c.mobile && <p>موبایل: {c.mobile}</p>}{c.address && <p>{c.address}</p>}{c.hours && <p>ساعات کاری: {c.hours}</p>}</div>
      </div>
    </footer>
  );
}
