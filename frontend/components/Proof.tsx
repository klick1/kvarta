export default function Proof() {
  return (
    <section className="border-b border-[color:var(--line-2)] py-14 sm:py-16">
      <div className="mx-auto max-w-site px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <div
            className="mb-4 text-2xl tracking-widest text-terra"
            aria-label="Оценка 4.9 из 5"
          >
            ★★★★★{" "}
            <span className="ml-2 align-middle text-base font-bold text-coffee">
              4.9
            </span>
          </div>
          <p className="mb-4 font-serif text-[22px] italic leading-snug text-coffee">
            «Заказываю с зимы — беру Эфиопию на воронку. Нравится, что не надо
            ничего заполнять: оставил номер, перезвонили, привезли в пятницу.
            И реально пахнет иначе, чем то, что было до.»
          </p>
          <p className="text-sm text-muted">Мария, Минск · клиент с 2023</p>
        </div>
      </div>
    </section>
  );
}