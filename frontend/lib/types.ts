export type Interest = "subscription" | "order" | "question";

export type LeadPayload = {
  name: string;
  phone: string;
  interest: Interest;
  comment?: string | null;
  company?: string;

  ts?: number;
  sig?: string;

  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  referrer?: string | null;
  page_url?: string | null;
};

export type LeadResponse = {
  ok: boolean;
  id?: number | null;
  duplicate?: boolean;
  message?: string | null;
};

export type Challenge = {
  ts: number;
  sig: string;
};

export type ApiError = {
  detail?: string;
};