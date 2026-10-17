const ITEMS = [
  "партии по 5 кг",
  "обжарка по четвергам",
  "развоз по пятницам",
  "самовывоз на Короля, 9",
  "с 2019 года",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-[color:var(--line-2)] bg-sand"
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max gap-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-coffee-2"
        style={{ animation: "marquee 42s linear infinite" }}
      >
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="flex items-center gap-9">
            {t} <span className="text-[9px] text-terra">●</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}