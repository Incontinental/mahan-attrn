export default function Thumb({ src, alt }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />;
  return (
    <div className="flex h-full w-full items-center justify-center bg-beige">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#647C51" strokeWidth="1.2"><path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z"/><path d="M5 19 14 10"/></svg>
    </div>
  );
}
