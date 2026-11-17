import ProductList from "@/components/ProductList";
export const dynamic = "force-dynamic";
export const metadata = { title: "فروشگاه | ماهان عطر" };
export default function Shop({ searchParams }) {
  return (<><h1 className="mx-auto mt-8 max-w-6xl px-4 text-3xl font-bold text-olive">فروشگاه</h1><ProductList base="/shop" sp={searchParams} /></>);
}
