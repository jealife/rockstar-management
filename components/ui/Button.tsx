import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-yellow text-ink hover:bg-cream",
  secondary: "bg-ink text-cream border border-cream/15 hover:bg-cream hover:text-ink hover:border-cream",
  outline: "border border-cream/40 text-cream hover:bg-cream hover:text-ink",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:hover:scale-100";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string; target?: string; rel?: string };
type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
