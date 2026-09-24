import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "lg";
};

export default function Logo({ size = "lg" }: LogoProps) {
  const small = size === "sm";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      
      <Image
  src="/logo.png"
  alt=""
  width={28}
  height={28}
  className={small ? "h-5 w-5" : "h-7 w-7"}
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