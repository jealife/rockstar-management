"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className={cn("transition-[padding] duration-300", scrolled ? "px-4 pt-4" : "px-0 pt-0")}>
        <Container className={cn("transition-[max-width] duration-300", scrolled ? "max-w-5xl" : "max-w-6xl")}>
          <div
            className={cn(
              "flex h-16 items-center justify-between rounded-full border transition-all duration-300 sm:h-[4.5rem]",
              scrolled
                ? "border-cream/10 bg-ink/90 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-6"
                : "border-transparent bg-transparent px-2 sm:px-4",
            )}
          >
            <Logo className="shrink-0" />

            <nav className="hidden shrink-0 items-center gap-0.5 lg:flex xl:gap-1">
              {mainNav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4",
                      active ? "text-ink" : "text-cream/70 hover:text-cream",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-yellow"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.shortLabel ?? item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 lg:block">
              <Button href="/adherer" variant="primary" className="px-5 py-2.5">
                Adhérer
              </Button>
            </div>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label="Ouvrir le menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </Dialog.Trigger>
              <AnimatePresence>
                {open ? (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild forceMount>
                      <motion.div
                        className="fixed inset-0 z-50 bg-black/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild forceMount>
                      <motion.div
                        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-1 border-l border-cream/10 bg-ink p-6"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 34 }}
                      >
                        <Dialog.Title className="sr-only">Menu de navigation</Dialog.Title>
                        <div className="mb-6 flex items-center justify-between">
                          <Logo />
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              aria-label="Fermer le menu"
                              className="flex h-10 w-10 items-center justify-center rounded-full text-cream"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </Dialog.Close>
                        </div>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                          className="flex flex-col gap-1"
                        >
                          {mainNav.map((item) => (
                            <motion.div key={item.href} variants={staggerItem}>
                              <Dialog.Close asChild>
                                <Link
                                  href={item.href}
                                  className="block rounded-lg px-3 py-3 text-lg font-medium text-cream hover:bg-cream/10"
                                >
                                  {item.label}
                                </Link>
                              </Dialog.Close>
                            </motion.div>
                          ))}
                          <motion.div variants={staggerItem}>
                            <Dialog.Close asChild>
                              <Button href="/adherer" variant="primary" className="mt-4">
                                Adhérer
                              </Button>
                            </Dialog.Close>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                ) : null}
              </AnimatePresence>
            </Dialog.Root>
          </div>
        </Container>
      </div>
    </header>
  );
}
