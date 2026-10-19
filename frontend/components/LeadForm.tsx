  "use client";

  import { useEffect, useRef, useState } from "react";
  import {
    formatPhone,
    hasDigits,
    isValidBYPhone,
  } from "@/lib/phone";
  import { getUtm, readUtmFromUrl, saveUtm } from "@/lib/utm";
  import type { Challenge, Interest, LeadPayload, SourceType  } from "@/lib/types";

  type Status = "idle" | "sending" | "ok" | "error";

  export default function LeadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [interest, setInterest] = useState<Interest>("subscription");
    const [source, setSource] = useState<SourceType | "">("");
    const [comment, setComment] = useState("");
    const [company, setCompany] = useState(""); // honeypot

    const [errName, setErrName] = useState("");
    const [errPhone, setErrPhone] = useState("");

    const [status, setStatus] = useState<Status>("idle");
    const [msg, setMsg] = useState("");

    // challenge — на маунте и после успешной отправки
    const fetchChallenge = async () => {
      try {
        const res = await fetch("/api/challenge", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Challenge;
        setChallenge(data);
      } catch {
        /* noop */
      }
    };

    useEffect(() => {
      fetchChallenge();
      // запоминаем UTM в sessionStorage при первом заходе
      saveUtm({ ...getUtm(), ...readUtmFromUrl() });

      // клики по кнопкам с data-interest (например, в Subscription)
      const handler = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>(
          "[data-interest]"
        );
        if (!target) return;
        const val = target.getAttribute("data-interest");
        if (val === "subscription" || val === "order" || val === "question") {
          setInterest(val);
        }
      };
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }, []);

   
    const validate = (): boolean => {
      let ok = true;
      setErrName("");
      setErrPhone("");

      if (name.trim().length < 2) {
        setErrName("Напишите, как к вам обращаться");
        ok = false;
      }
      if (!isValidBYPhone(phone)) {
        setErrPhone(
          "Нужен белорусский номер, например +375 29 123-45-67"
        );
        ok = false;
      }
      return ok;
    };

    
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (status === "sending") return;
      if (!validate()) {
        setStatus("idle");
        setMsg("");
        return;
      }

      setStatus("sending");
      setMsg("");

      const utm = getUtm();
      const payload: LeadPayload = {
        name: name.trim(),
        phone,
        interest,
        source: source || null,
        comment: comment.trim() || null,
        company,
        ts: challenge?.ts ?? 0,
        sig: challenge?.sig ?? "",
        page_url: typeof window !== "undefined" ? window.location.href : null,
        referrer:
          typeof document !== "undefined"
            ? document.referrer || null
            : null,
        ...utm,
      };

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          /* ignore */
        }

        if (!res.ok) {
          const detail =
            (data && data.detail) || "Не удалось отправить заявку";
          throw new Error(detail);
        }

        setStatus("ok");
        setMsg(
          data.duplicate
            ? "Заявка уже принята — перезвоним в течение дня."
            : "Спасибо! Перезвоним в течение дня."
        );

        // сброс
        setName("");
        setPhone("");
        setComment("");
        setCompany("");
        setErrName("");
        setErrPhone("");
        formRef.current?.reset();

        // новый challenge — на случай второй отправки
        fetchChallenge();
      } catch (err) {
        setStatus("error");
        setMsg(
          (err as Error)?.message ||
            "Что-то пошло не так. Попробуйте ещё раз или позвоните нам: +375 29 000-00-00"
        );
      }
    };

    return (
      <section
        id="order"
        className="border-t border-[color:var(--line-2)] bg-cream-2 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-site px-6">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-terra">
            06 — Заявка
          </span>
          <h2
            className="mb-4 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.02] tracking-[-0.03em]"
            style={{ fontVariationSettings: '"opsz" 96, "WONK" 1, "SOFT" 30' }}
          >
            Оставьте номер —<br />перезвоним в течение дня.
          </h2>
          <p className="mb-10 max-w-[46ch] text-lg text-coffee-2">
            Ничего оплачивать онлайн не нужно. Менеджер уточнит зерно, помол
            и удобное время.
          </p>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            autoComplete="on"
            className="max-w-[680px]"
          >
            {/* honeypot */}
            <div className="hp" aria-hidden="true">
              <label>
                Не заполняйте это поле
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="mb-1 flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-coffee-2"
                >
                  Как вас зовут
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="given-name"
                  placeholder="Аня"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errName) setErrName("");
                  }}
                  aria-invalid={!!errName}
                  className={`w-full rounded-sm border bg-paper px-4 py-3.5 font-sans text-[17px] text-coffee outline-none transition-shadow ${
                    errName
                      ? "border-[#B33] shadow-[0_0_0_3px_rgba(187,51,51,0.12)]"
                      : "border-[color:var(--line)] focus:border-terra focus:bg-white focus:shadow-[0_0_0_3px_rgba(193,102,47,0.14)]"
                  }`}
                />
                <span className="min-h-[16px] text-[13px] text-[#B33]">
                  {errName}
                </span>
              </div>

              <div className="mb-1 flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-coffee-2"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+375 29 123-45-67"
                  value={phone}
                  onFocus={() => {
                    if (!phone) setPhone("+375 ");
                  }}
                  onBlur={() => {
                    if (phone === "+375 " || phone === "+375") setPhone("");
                  }}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    if (errPhone) setErrPhone("");
                  }}
                  aria-invalid={!!errPhone}
                  className={`w-full rounded-sm border bg-paper px-4 py-3.5 font-sans text-[17px] text-coffee outline-none transition-shadow ${
                    errPhone
                      ? "border-[#B33] shadow-[0_0_0_3px_rgba(187,51,51,0.12)]"
                      : "border-[color:var(--line)] focus:border-terra focus:bg-white focus:shadow-[0_0_0_3px_rgba(193,102,47,0.14)]"
                  }`}
                />
                <span className="min-h-[16px] text-[13px] text-[#B33]">
                  {errPhone}
                </span>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-coffee-2">
                Что интересует
              </label>
              <div
                role="radiogroup"
                aria-label="Что интересует"
                className="flex flex-wrap gap-2"
              >
                {(
                  [
                    ["subscription", "Подписка"],
                    ["order", "Разовый заказ"],
                    ["question", "Вопрос"],
                  ] as const
                ).map(([val, label]) => (
                  <label
                    key={val}
                    className={`relative cursor-pointer select-none rounded-full border px-4 py-2.5 text-[15px] transition-colors ${
                      interest === val
                        ? "border-coffee bg-coffee text-paper"
                        : "border-[color:var(--line)] bg-paper text-coffee hover:border-coffee-2"
                    }`}
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={val}
                      checked={interest === val}
                      onChange={() => setInterest(val)}
                      className="pointer-events-none absolute opacity-0"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-2">
  <label className="text-sm font-semibold text-coffee-2">
    Откуда узнали о нас?{" "}
    <small className="font-normal text-muted">— необязательно</small>
  </label>
  <div
    role="radiogroup"
    aria-label="Откуда узнали"
    className="flex flex-wrap gap-2"
  >
    {(
      [
        ["friend", "От друга/подруги"],
        ["instagram", "Instagram"],
        ["yandex", "Реклама в Яндексе"],
        ["other", "Другое"],
      ] as const
    ).map(([val, label]) => (
      <label
        key={val}
        className={`relative cursor-pointer select-none rounded-full border px-4 py-2 text-[14px] transition-colors ${
          source === val
            ? "border-terra bg-terra/10 text-terra"
            : "border-[color:var(--line)] bg-paper text-coffee hover:border-coffee-2"
        }`}
      >
        <input
          type="radio"
          name="source"
          value={val}
          checked={source === val}
          onChange={() => setSource(val)}
          className="pointer-events-none absolute opacity-0"
        />
        <span>{label}</span>
      </label>
    ))}
  </div>
</div>
               




            <div className="mb-5 flex flex-col gap-2">
              <label
                htmlFor="comment"
                className="text-sm font-semibold text-coffee-2"
              >
                Комментарий{" "}
                <small className="font-normal text-muted">— необязательно</small>
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                maxLength={500}
                placeholder="Например: нужен светлый на фильтр, помол под воронку"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-sm border border-[color:var(--line)] bg-paper px-4 py-3.5 font-sans text-[17px] text-coffee outline-none transition-shadow focus:border-terra focus:bg-white focus:shadow-[0_0_0_3px_rgba(193,102,47,0.14)]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center rounded-full bg-coffee px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-terra disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Отправляем…" : "Отправить заявку"}
            </button>

            <p className="mt-4 text-sm text-muted">
              Нажимая кнопку, вы соглашаетесь на один звонок по указанному номеру.
            </p>

            <div
              role="status"
              aria-live="polite"
              className={`mt-4 min-h-[22px] text-[15px] ${
                status === "ok"
                  ? "font-semibold text-[#2E6B34]"
                  : status === "error"
                  ? "font-semibold text-[#B33]"
                  : ""
              }`}
            >
              {msg}
            </div>
          </form>
        </div>
      </section>
    );
  }