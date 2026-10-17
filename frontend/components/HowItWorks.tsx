const STEPS = [
  {
    n: 1,
    title: "Оставляете заявку",
    body: "Имя и телефон. Если хотите — комментарий: помол, зерно, удобное время. Тридцать секунд.",
  },
  {
    n: 2,
    title: "Перезваниваем в течение дня",
    body: "Уточняем зерно, помол и когда удобно привезти. Ничего оплачивать заранее не нужно.",
  },
  {
    n: 3,
    title: "Привозим в пятницу",
    body: "Зерно из четверговой обжарки. По Минску — курьером, или забираете сами на Короля, 9.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-[color:var(--line-2)] py-16 sm:py-24">
      <div className="mx-auto max-w-site px-6">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-terra">
          03 — Как это работает
        </span>
        <h2
          className="mb-12 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
          style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
        >
          Три шага —<br />и кофе у вас.
        </h2>

        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t border-[color:var(--line)] pt-6">
              <span
                className="mb-4 block font-serif text-[64px] font-medium leading-none tracking-[-0.04em] text-terra"
                style={{ fontVariationSettings: '"opsz" 144, "WONK" 1' }}
              >
                {s.n}
              </span>
              <h3 className="mb-3 font-serif text-2xl font-medium tracking-[-0.015em]">
                {s.title}
              </h3>
              <p className="text-coffee-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}