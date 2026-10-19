import Image from "next/image";

type Product = {
  title: string;
  notes: string;
  price: number;
  weight: string;
  img: string;
  alt: string;
};

const PRODUCTS: Product[] = [
  {
    title: "Эфиопия Иргачеффе",
    notes: "цветочный · бергамот · светлая обжарка",
    price: 32,
    weight: "250 г",
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80&auto=format&fit=crop",
    alt: "Эфиопия Иргачеффе, светлая обжарка",
  },
  {
    title: "Колумбия Уила",
    notes: "карамель · красное яблоко",
    price: 29,
    weight: "250 г",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&auto=format&fit=crop",
    alt: "Колумбия Уила",
  },
  {
    title: "Бразилия Серрадо",
    notes: "орех · шоколад · под эспрессо",
    price: 26,
    weight: "250 г",
    img: "https://images.unsplash.com/photo-1521302200778-33500795e128?w=600&q=80&auto=format&fit=crop",
    alt: "Бразилия Серрадо",
  },
  {
    title: "Дрип-пакеты, ассорти",
    notes: "10 штук · на работу, в дорогу, в подарок",
    price: 18,
    weight: "10 шт",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop",
    alt: "Дрип-пакеты ассорти",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="border-t border-[color:var(--line-2)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-site px-6">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-terra">
          01 — Зерно
        </span>
        <h2
          className="mb-4 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
          style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
        >
          Что обжариваем
          <br />
          сейчас
        </h2>
        <p className="mb-12 max-w-[56ch] text-lg text-coffee-2">
          Каждую неделю — три позиции на полке плюс дрип-пакеты. Светлая обжарка
          для фильтра, средняя — под эспрессо
        </p>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <li
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-md border border-[color:var(--line)] bg-paper transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3
                  className="mb-1.5 font-serif text-[22px] font-medium tracking-[-0.015em]"
                  style={{ fontVariationSettings: '"opsz" 60, "WONK" 1' }}
                >
                  {p.title}
                </h3>
                <p className="mb-5 text-sm text-coffee-2">{p.notes}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="font-serif text-2xl font-semibold tracking-[-0.02em]">
                    {p.price} BYN{" "}
                    <small className="ml-1 align-middle text-xs font-normal text-muted">
                      {p.weight}
                    </small>
                  </span>
                  <a
                    href="#order"
                    className="text-sm font-semibold text-terra hover:text-terra-2"
                  >
                    Заказать →
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          Онлайн-оплаты нет — оставляете заявку, менеджер перезванивает и всё
          оформляет по телефону
        </p>
      </div>
    </section>
  );
}