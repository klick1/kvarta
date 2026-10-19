export default function Footer() {
  return (
    <footer
      id="contacts"
      className="border-t border-[color:var(--line-2)] bg-cream py-14"
    >
      <div className="mx-auto grid max-w-site grid-cols-1 gap-8 px-6 md:grid-cols-[1fr_1fr_1fr_auto]">
        <div>
          <p
            className="mb-1.5 font-serif text-[24px] font-semibold tracking-[-0.025em]"
            style={{ fontVariationSettings: '"opsz" 60, "WONK" 1' }}
          >
            Кварта
          </p>
          <p className="mb-1.5 text-sm text-muted">
            Обжарка кофе. Минск, ул. Короля, 9
          </p>
          <p className="text-sm text-muted">Фото — Unsplash.</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-coffee-2">
            Разделы
          </p>
          <ul className="grid gap-1.5">
            <li>
              <a
                href="#products"
                className="text-[15px] no-underline hover:underline"
              >
                Зерно
              </a>
            </li>
            <li>
              <a
                href="#subscription"
                className="text-[15px] no-underline hover:underline"
              >
                Подписка
              </a>
            </li>
            <li>
              <a
                href="#how"
                className="text-[15px] no-underline hover:underline"
              >
                Как это работает
              </a>
            </li>
            <li>
              <a
                href="#delivery"
                className="text-[15px] no-underline hover:underline"
              >
                Доставка
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-coffee-2">
            Контакты
          </p>
          <p className="mb-1 text-sm">
            <a
              href="tel:+375290000000"
              className="border-b border-[color:var(--line)] no-underline hover:border-coffee"
            >
              +375 29 000-00-00
            </a>
          </p>
          <p className="mb-1 text-sm">
            <a
              href="mailto:hi@kvarta.by"
              className="border-b border-[color:var(--line)] no-underline hover:border-coffee"
            >
              hi@kvarta.by
            </a>
          </p>
          <p className="text-sm text-muted">
            Пн–пт 8:00–20:00 · Сб–вс 10:00–18:00
          </p>
        </div>

        <div className="md:text-right">
          <a
            href="#order"
            className="inline-flex items-center justify-center rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-2"
          >
            Оформить заказ
          </a>
        </div>
      </div>
    </footer>
  );
}