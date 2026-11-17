import { contact } from "@/lib/config";
export const metadata = { title: "تماس با ما | ماهان عطر" };
export default function Contact() {
  const c = contact();
  const rows = [["تلفن", c.phone], ["موبایل", c.mobile], ["آدرس", c.address], ["ساعات کاری", c.hours]].filter((r) => r[1]);
  return (
    <div className="mx-auto max-w-2xl px-3 py-6 md:px-4">
      <h1 className="mb-4 text-2xl font-bold text-olive md:text-3xl">تماس با ما</h1>
      {rows.length || c.instagram || c.telegram ? (
        <div className="space-y-3 rounded-2xl bg-white p-4 text-sm leading-7">
          {rows.map(([k, v]) => <p key={k}><b className="text-olive">{k}:</b> {v}</p>)}
          {c.instagram && <p><a href={c.instagram} className="text-herb underline">اینستاگرام</a></p>}
          {c.telegram && <p><a href={c.telegram} className="text-herb underline">تلگرام</a></p>}
        </div>
      ) : <p className="rounded-2xl bg-beige p-4 text-sm leading-7">اطلاعات تماس هنوز تکمیل نشده است. مقادیر در تنظیمات محیطی (NEXT_PUBLIC_PHONE و …) وارد می‌شوند.</p>}
    </div>
  );
}
