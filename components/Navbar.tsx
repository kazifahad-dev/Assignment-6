"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {

  const pathname = usePathname();

  
  const planCount = 0;
  const savedCount = 0;

  
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workout")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          <Logo />
        </div>

        <nav className="order-last flex w-full justify-center gap-1 md:order-0 md:w-auto">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                isActive(href)
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 justify-self-end text-sm">
          <Link href="/my-plan" className="flex items-center gap-2">
            Plan
            <span className="badge badge-primary font-bold">{planCount}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-muted">
            Saved
            <span className="badge badge-outline font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}