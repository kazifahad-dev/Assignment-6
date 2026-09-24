import Link from "next/link";
import { Dumbbell } from "lucide-react";


type LogoProps = {
  size?: "sm" | "lg";
};


export default function Logo({ size = "lg" }: LogoProps) {
  const small = size === "sm";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Dumbbell
        className={`-rotate-45 text-primary ${small ? "h-5 w-5" : "h-7 w-7"}`}
        aria-hidden
      />
      <span
        className={`font-display font-bold tracking-wide ${
          small ? "text-sm" : "text-xl"
        }`}
      >
        FITLOG
      </span>
    </Link>
  );
}