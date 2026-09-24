import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });


export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}