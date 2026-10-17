import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const karla = Karla({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-karla",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kvarta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Кварта — свежая обжарка кофе в Минске. Обжариваем в четверг, развозим в пятницу.",
  description:
    "Малая обжарка в Минске. Партии по 5 кг, обжарка по четвергам, развоз по пятницам. Зерно у вас на 1–3 день после обжарки. Подписка 54 BYN/мес.",
  themeColor: "#F5EDE0",
  openGraph: {
    type: "website",
    title: "Кварта — свежая обжарка кофе в Минске",
    description:
      "Обжариваем по четвергам, развозим по пятницам. Партии по 5 кг с 2019 года.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Кварта" }],
    locale: "ru_BY",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${karla.variable}`}>
      <body className="font-sans text-[17px] leading-[1.55]">
        {children}
      </body>
    </html>
  );
}