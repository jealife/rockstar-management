"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import StarMark from "@/components/brand/StarMark";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { siteInfo } from "@/lib/content/site-info";

// Transparent over the hero's halo glow, gains a soft dark backdrop once the
// page scrolls past it. The menu itself is a full-screen takeover, not a
// side drawer — logo/link row up top, huge stacked links, star mark, CTA.
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      {!scrolled ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/40 to-transparent"
        />
      ) : null}
      <Container className={cn("flex items-center justify-between transition-[height] duration-300", scrolled ? "h-16" : "h-20")}>
        <Logo />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-cream transition-colors hover:text-brand-yellow"
            >
              Menu
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <AnimatePresence>
            {open ? (
              <Dialog.Portal forceMount>
                <Dialog.Content asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 flex flex-col bg-ink"
                    initial={{ clipPath: "circle(0% at 100% 0%)" }}
                    animate={{ clipPath: "circle(150% at 100% 0%)" }}
                    exit={{ clipPath: "circle(0% at 100% 0%)" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Dialog.Title className="sr-only">Menu de navigation</Dialog.Title>

                    <Container className="flex h-20 shrink-0 items-center justify-between">
                      <Logo />
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          aria-label="Fermer le menu"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-cream transition-colors hover:text-brand-yellow"
                        >
                          <X className="h-7 w-7" />
                        </button>
                      </Dialog.Close>
                    </Container>

                    <div className="relative flex flex-1 items-center overflow-hidden">
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 lg:block"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                        style={{ filter: "drop-shadow(0 0 100px rgba(255, 198, 0, 0.3))" }}
                      >
                        <StarMark className="h-[42rem] w-[42rem]" />
                      </motion.div>

                      <Container className="relative">
                        <motion.nav
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                          className="flex flex-col gap-1 sm:gap-2"
                        >
                          {mainNav.map((item) => {
                            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            return (
                              <motion.div key={item.href} variants={staggerItem}>
                                <Dialog.Close asChild>
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      "font-display block text-4xl font-semibold leading-tight transition-colors sm:text-6xl lg:text-7xl",
                                      active ? "text-brand-yellow" : "text-cream hover:text-brand-yellow",
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                </Dialog.Close>
                              </motion.div>
                            );
                          })}
                        </motion.nav>
                      </Container>
                    </div>

                    <Container className="flex shrink-0 flex-col gap-6 border-t border-cream/10 py-8 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-cream/50">{siteInfo.address}</p>
                      <Dialog.Close asChild>
                        <Button href="/adherer" variant="primary">
                          Adhérer
                        </Button>
                      </Dialog.Close>
                    </Container>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </Dialog.Root>
      </Container>
    </header>
  );
}
