const KEY = "kvarta_utm";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmMap = Partial<Record<UtmKey, string>>;

export function readUtmFromUrl(): UtmMap {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: UtmMap = {};
  UTM_KEYS.forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

export function readUtmFromSession(): UtmMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveUtm(map: UtmMap): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* noop */
  }
}

export function getUtm(): UtmMap {
  return { ...readUtmFromSession(), ...readUtmFromUrl() };
}