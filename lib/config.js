// مقادیر نمونه؛ بعداً از تنظیمات فروشگاه خوانده می‌شوند.
export const SHIPPING_COST = 60000;
export const FREE_FROM = 1000000;
export const STATUS = { PLACED:"ثبت سفارش", PENDING_PAYMENT:"در انتظار پرداخت", PAID:"پرداخت‌شده", PREPARING:"در حال آماده‌سازی", HANDED_TO_CARRIER:"تحویل به پست یا شرکت ارسال", SHIPPED:"ارسال‌شده", DELIVERED:"تحویل داده‌شده", CANCELED:"لغوشده" };
export const FLOW = ["PLACED","PENDING_PAYMENT","PAID","PREPARING","HANDED_TO_CARRIER","SHIPPED","DELIVERED"];
export const contact = () => ({
  phone: process.env.NEXT_PUBLIC_PHONE, mobile: process.env.NEXT_PUBLIC_MOBILE, address: process.env.NEXT_PUBLIC_ADDRESS,
  hours: process.env.NEXT_PUBLIC_HOURS, instagram: process.env.NEXT_PUBLIC_INSTAGRAM, telegram: process.env.NEXT_PUBLIC_TELEGRAM,
});
