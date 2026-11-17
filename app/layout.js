import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import Floating from "@/components/Floating";
export const metadata = { title: "ماهان عطر | گیاهان دارویی، دمنوش و محصولات طبیعی", description: "فروشگاه اینترنتی ماهان عطر" };
export const viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head><link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" rel="stylesheet" /></head>
      <body className="pb-20 md:pb-0"><Header /><main>{children}</main><Footer /><BottomNav /><Floating /></body>
    </html>
  );
}
