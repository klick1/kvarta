const BY_PHONE = /^\+375(25|29|33|44)\d{7}$/;

/** Есть ли в значении хоть одна цифра — чтобы не падать на пустом инпуте */
export function hasDigits(value: string): boolean {
  return /\d/.test(value || "");
}

/**
 * Приводит значение к виду +375 XX XXX-XX-XX.
 * Работает по мере ввода: 80…, 0…, 9 цифр → 375+…
 */
export function formatPhone(value: string): string {
  let d = (value || "").replace(/\D/g, "");
  if (!d) return "";

  if (d.startsWith("80")) d = "375" + d.slice(2);
  else if (d.startsWith("0")) d = "375" + d.slice(1);
  else if (!d.startsWith("375") && d.length <= 9) d = "375" + d;

  d = d.slice(0, 12);

  let out = "+375";
  if (d.length > 3)  out += " " + d.slice(3, 5);
  if (d.length > 5)  out += " " + d.slice(5, 8);
  if (d.length > 8)  out += "-" + d.slice(8, 10);
  if (d.length > 10) out += "-" + d.slice(10, 12);
  return out;
}

/** Строгая проверка BY-номера (совпадает с бэкендом). */
export function isValidBYPhone(value: string): boolean {
  const digits = (value || "").replace(/[\s-]/g, "");
  return BY_PHONE.test(digits);
}