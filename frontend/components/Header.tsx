"use client";

import { useState } from "react";

const NAV = [
  ["#products", "Зерно"],
  ["#subscription", "Подписка"],
  ["#how", "Как это работает"],
  ["#about", "О нас"],
  ["#delivery", "Доставка"],
  ["#contacts", "Контакты"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:var(--line-2)] bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-site items-center gap-7 px-6 py-3.5">
          <a
            href="#"
            className="font-serif text-[26px] font-semibold tracking-[-0.025em]"
            style={{ fontVariationSettings: '"opsz" 60, "WONK" 1' }}
          >
            Кварта
          </a>

          <nav
            className="ml-auto hidden gap-5 lg:flex"
            aria-label="Основная навигация"
          >
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="whitespace-nowrap border-b border-transparent py-1.5 text-[15px] text-coffee-2 transition-colors hover:border-coffee hover:text-coffee"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#order"
            className="ml-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_-8px_rgba(193,102,47,0.8)] transition-colors hover:bg-terra-2 lg:ml-0"
          >
            <CartIcon />
            <span className="hidden sm:inline">Оформить заказ</span>
          </a>

          <button
            className="flex flex-col gap-1 p-2 lg:hidden"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-[22px] rounded bg-coffee transition ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] rounded bg-coffee transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] rounded bg-coffee transition ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-[62px] z-40 grid gap-1 border-b border-[color:var(--line)] bg-paper px-6 pb-6 pt-5 shadow-[0_20px_30px_-20px_rgba(59,35,20,0.35)] lg:hidden">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="border-b border-[color:var(--line-2)] px-1 py-3 text-[17px]"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#order"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-terra px-6 py-3.5 text-base font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Оформить заказ
          </a>
        </div>
      )}
    </>
  );
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6h15l-1.5 9h-12L6 6zM6 6L5 3H2M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}