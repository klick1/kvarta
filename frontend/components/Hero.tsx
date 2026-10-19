import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-site grid-cols-1 items-end gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-terra">
            Обжарка кофе · Минск · с 2019
          </p>

          <h1
            className="mb-6 font-serif text-[clamp(40px,6.6vw,84px)] font-medium leading-[0.98] tracking-[-0.035em]"
            style={{ fontVariationSettings: '"opsz" 144, "WONK" 1, "SOFT" 30' }}
          >
            Обжариваем в{" "}
            <em
              className="italic text-terra"
              style={{
                fontVariationSettings: '"opsz" 144, "WONK" 1, "SOFT" 80',
              }}
            >
              четверг
            </em>
            ,
            <br />
            развозим в пятницу
          </h1>

          <p className="mb-8 max-w-[46ch] text-[19px] leading-[1.5] text-coffee-2">
            Мастерская на Короля, 9. Партии по 5 кг, обжариваем раз в неделю —
            поэтому зерно попадает к вам на 1–3 день после обжарки, а не через
            месяц
          </p>

          <div className="mb-5 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-coffee px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-terra"
              href="#order"
            >
              Оформить заказ
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] px-7 py-3.5 text-base font-semibold text-coffee transition-colors hover:border-coffee"
              href="#products"
            >
              Смотреть зерно
            </a>
          </div>

          <p className="max-w-[42ch] text-sm text-muted">
            Без корзины и онлайн-оплаты. Оставляете номер — перезваниваем в
            течение дня
          </p>
        </div>

        <figure className="relative m-0 max-w-[340px] rotate-[1.6deg] lg:max-w-none">
          <Image
            src="https://i.pinimg.com/736x/02/5d/83/025d833580935529c52609fe77ddde13.jpg"
            alt="Только что обжаренные кофейные зёрна"
            width={760}
            height={950}
            priority
            sizes="(max-width: 900px) 340px, 380px"
            className="aspect-[4/5] w-full rounded-md object-cover shadow-[0_28px_50px_-24px_rgba(59,35,20,0.5)]"
          />
          
        </figure>
      </div>
    </section>
  );
}