import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "light" = cream wordmark, for dark surfaces. "dark" = black wordmark, for the yellow footer. */
  variant?: "light" | "dark";
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Rock'Star Management — Accueil">
      <Image
        src={variant === "dark" ? "/brand/logo-rockstar.svg" : "/brand/logo-rockstar-light.svg"}
        alt="Rock'Star Management"
        width={163}
        height={70}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
