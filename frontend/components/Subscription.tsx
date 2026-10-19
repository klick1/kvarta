import Image from "next/image";

const CHECKS = [
  "доставка по Минску включена",
  "можно поставить на паузу на любой месяц",
  "первая пачка — из ближайшего четверга",
];

export default function Subscription() {
  return (
    <section
      id="subscription"
      className="border-t border-terra-2 bg-terra py-16 text-paper sm:py-24"
    >
      <div className="mx-auto max-w-site px-6">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_320px_auto] lg:gap-14">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-paper/70">
              02 — Подписка
            </span>
            <h2
              className="mb-6 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
              style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
            >
              Две пачки
              <br />
              каждый месяц
            </h2>
            <p className="mb-7 max-w-[46ch] text-lg text-paper/85">
              Одна фиксированная сумма, две свежие пачки по 250 г раз в месяц
              Что именно — выберем вместе по телефону, можно менять каждый раз
            </p>

            <ul className="mb-8 grid gap-2.5">
              {CHECKS.map((t) => (
                <li
                  key={t}
                  className="relative pl-6 text-paper/90 before:absolute before:left-0 before:top-[0.62em] before:h-0.5 before:w-3 before:bg-current before:opacity-70"
                >
                  {t}
                </li>
              ))}
            </ul>

            <a
              href="#order"
              data-interest="subscription"
              className="inline-flex items-center justify-center rounded-full bg-paper px-7 py-3.5 text-base font-semibold text-terra-2 transition-colors hover:bg-coffee hover:text-paper"
            >
              Оформить подписку
            </a>
          </div>

          <figure className="m-0 overflow-hidden rounded-md">
            <Image
              src="https://i.pinimg.com/1200x/c1/6b/e2/c16be2d1f588b5f267f63122c036f675.jpg"
              alt="Чашка свежесваренного кофе"
              width={640}
              height={800}
              sizes="(max-width: 1024px) 100vw, 320px"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>

          <div className="text-left lg:text-right">
            <span
              className="block font-serif text-[clamp(88px,12vw,168px)] font-medium leading-[0.86] tracking-[-0.045em]"
              style={{ fontVariationSettings: '"opsz" 144, "WONK" 1' }}
            >
              54
            </span>
            <span className="mt-2.5 block text-[15px] uppercase tracking-[0.14em] opacity-85">
              BYN / месяц
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}