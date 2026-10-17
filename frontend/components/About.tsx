import Image from "next/image";

const FACTS: [string, string][] = [
  ["5 кг", "размер одной партии, не больше"],
  ["1–3 дня", "от обжарки до вашей двери"],
  ["2019", "год первой партии"],
];

export default function About() {
  return (
    <section id="about" className="border-t border-[color:var(--line-2)] py-16 sm:py-24">
      <div className="mx-auto max-w-site px-6">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-terra">
          04 — Кто мы
        </span>
        <h2
          className="mb-12 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
          style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
        >
          Аня и Дмитрий,<br />двое бариста<br />с ростером.
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <figure className="relative m-0">
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80&auto=format&fit=crop"
              alt="Обжарка кофе в мастерской"
              width={800}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
            <figcaption className="absolute -bottom-3.5 left-3.5 -rotate-2 rounded border border-[color:var(--line)] bg-paper px-2.5 py-1.5 text-xs text-coffee-2">
              мастерская на Короля, 9
            </figcaption>
          </figure>

          <div>
            <p className="mb-4 text-lg text-coffee-2">
              «Кварта» началась с того, что нам надоело объяснять гостям,
              почему кофе с полки в супермаркете не имеет ничего общего
              с тем, что мы варим за баром. Мы обжариваем сами, маленькими
              партиями — 5 кг за раз. Этого хватает примерно на 30–40
              заказов, и всё уходит за неделю.
            </p>
            <p className="mb-4 text-lg text-coffee-2">
              Зерно приходит к вам на 1–3 день после обжарки. Не через
              месяц, не «свежее по дате на упаковке» — реально свежее,
              ещё дышащее. Это то, что мы на самом деле продаём.
            </p>
            <p className="my-6 border-l-2 border-terra pl-4 font-serif text-xl italic text-coffee">
              Аня обжаривает. Дмитрий везёт. Если что-то не так — пишите
              в форме ниже, читаем сами.
            </p>

            <dl className="mt-8 grid gap-5">
              {FACTS.map(([dt, dd]) => (
                <div
                  key={dt}
                  className="border-t border-[color:var(--line)] pb-5 pt-4 last:border-b"
                >
                  <dt
                    className="mb-1 font-serif text-[40px] font-semibold leading-none tracking-[-0.03em]"
                    style={{ fontVariationSettings: '"opsz" 96, "WONK" 1' }}
                  >
                    {dt}
                  </dt>
                  <dd className="text-[15px] text-coffee-2">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}