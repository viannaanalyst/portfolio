"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/content/data";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "my-3 rounded-full border border-line bg-ink-2/80 py-3 backdrop-blur-xl"
            : "my-4 border border-transparent py-4"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="port-pulse inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-mono text-sm font-medium tracking-tight text-fg">
            gabriel<span className="text-muted">.vianna</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="group flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Disponível
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink/70" />
        </a>
      </div>
    </motion.header>
  );
}
