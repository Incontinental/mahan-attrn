import { prisma } from "@/lib/db";
import { SHIPPING_COST, FREE_FROM } from "@/lib/config";
export const dynamic = "force-dynamic";
const err = (m, s = 400) => Response.json({ error: m }, { status: s });
const t = (v, n) => String(v ?? "").trim().slice(0, n);
export async function POST(req) {
  let b; try { b = await req.json(); } catch { return err("درخواست نامعتبر است."); }
  const f = { name: t(b.name, 80), phone: t(b.phone, 11), province: t(b.province, 40), city: t(b.city, 40), line: t(b.line, 300), postal: t(b.postal, 10), note: t(b.note, 500) };
  if (!f.name || !f.province || !f.city || !f.line) return err("لطفاً همهٔ فیلدهای ضروری را پر کنید.");
  if (!/^09\d{9}$/.test(f.phone)) return err("شمارهٔ موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).");
  if (!/^\d{10}$/.test(f.postal)) return err("کد پستی باید ۱۰ رقم باشد.");
  const items = Array.isArray(b.items) ? b.items.slice(0, 50) : [];
  if (!items.length) return err("سبد خرید خالی است.");
  const key = t(b.key, 64) || null;
  if (key) { const ex = await prisma.order.findUnique({ where: { idempotencyKey: key } }); if (ex) return Response.json({ number: ex.number }); }
  const prods = await prisma.product.findMany({ where: { id: { in: [...new Set(items.map((i) => Number(i.id)))] }, active: true }, include: { variants: true } });
  let sum = 0; const lines = [];
  for (const it of items) {
    const p = prods.find((x) => x.id === Number(it.id));
    const qty = Math.min(20, Math.max(1, parseInt(it.qty) || 1));
    if (!p) return err("یکی از محصولات سبد دیگر در دسترس نیست. لطفاً سبد را بازبینی کنید.");
    const vid = Number(it.variantId) || 0;
    const v = vid ? p.variants.find((x) => x.id === vid) : null;
    if (vid && !v) return err(`گزینهٔ انتخابی «${p.name}» معتبر نیست.`);
    if ((v ? v.stock : p.stock) < qty) return err(`موجودی «${p.name}» کافی نیست.`);
    const unit = v ? v.price : p.salePrice || p.price;
    sum += unit * qty; lines.push({ productId: p.id, variantLabel: v?.label || null, unitPrice: unit, qty });
  }
  const ship = sum >= FREE_FROM ? 0 : SHIPPING_COST;
  const number = "MA" + Date.now().toString(36).toUpperCase() + Math.floor(10 + Math.random() * 90);
  try {
    const o = await prisma.order.create({ data: { number, status: "PENDING_PAYMENT", total: sum + ship, shippingCost: ship, shipName: f.name, shipPhone: f.phone, shipProvince: f.province, shipCity: f.city, shipLine: f.line, shipPostal: f.postal, note: f.note || null, idempotencyKey: key, items: { create: lines } } });
    return Response.json({ number: o.number });
  } catch (e) { console.error(e); return err("ثبت سفارش ناموفق بود. لطفاً دوباره تلاش کنید.", 500); }
}
