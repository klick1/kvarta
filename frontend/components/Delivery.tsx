export default function Delivery() {
  return (
    <section id="delivery" className="border-t border-[color:var(--line-2)] py-16 sm:py-24">
      <div className="mx-auto max-w-site px-6">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-terra">
          05 — Доставка и самовывоз
        </span>
        <h2
          className="mb-12 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
          style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
        >
          Как забрать
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="mb-3.5 font-serif text-2xl font-medium tracking-[-0.015em]">
              Самовывоз
            </h3>
            <p className="mb-2 text-lg">Минск, ул. Короля, 9</p>
            <p className="mb-3.5 text-base leading-[1.7] text-coffee-2">
              Пн–пт 8:00–20:00
              <br />
              Сб–вс 10:00–18:00
            </p>
            <p className="text-sm text-muted">
              Если хотите зайти и посмотреть на ростер — лучше в четверг,
              в день обжарки
            </p>
          </div>

          <div>
            <h3 className="mb-3.5 font-serif text-2xl font-medium tracking-[-0.015em]">
              Доставка по Минску
            </h3>
            <p className="mb-2 text-lg">Каждую пятницу</p>
            <p className="mb-3.5 text-base leading-[1.7] text-coffee-2">
              От 50 BYN — бесплатно
              <br />
              Меньше 50 BYN — 5 BYN за курьера
            </p>
            <p className="text-sm text-muted">
              Доставляем только то, что обжарили в четверг
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}