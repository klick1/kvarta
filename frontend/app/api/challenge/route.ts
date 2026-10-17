import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${base}/api/challenge`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { detail: "challenge unavailable" },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { detail: "challenge unavailable" },
      { status: 502 }
    );
  }
}