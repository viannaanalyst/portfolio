"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/data";
import { Typewriter } from "./Typewriter";

const ic = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const focusIcons: Record<string, React.ReactNode> = {
  // Automação & RPA — nós conectados
  automation: (
    <svg {...ic}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
      <path d="M7.2 6.8 16.8 11M7.2 17.2 16.8 13" />
    </svg>
  ),
  // Business Intelligence — gráfico de barras
  bi: (
    <svg {...ic}>
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" />
      <rect x="12" y="8" width="3" height="10" />
      <rect x="17" y="4" width="3" height="14" />
    </svg>
  ),
  // Integração & IA — documento + faísca
  ai: (
    <svg {...ic}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9" />
      <path d="M8 8h4M8 12h6M8 16h3" />
      <path d="M17.5 2.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" />
    </svg>
  ),
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* atmospheric light — sem grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-44 left-[12%] h-[560px] w-[640px] rounded-full bg-accent/[0.07] blur-[140px]" />
        <div className="absolute top-0 right-[2%] h-[440px] w-[440px] rounded-full bg-[#27406b]/25 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div
          variants={item}
          className="mb-6 flex h-6 items-center gap-2.5 overflow-hidden font-mono text-sm tracking-tight text-accent"
        >
          <span className="port-pulse inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
          <Typewriter phrases={[...profile.roles]} />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
        >
          {profile.name.split(" ")[0]}{" "}
          <span className="text-muted">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-medium leading-tight text-fg"
        >
          {profile.headline}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {profile.subheadline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Ver projetos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            {profile.email}
          </a>
        </motion.div>

        {/* áreas de atuação */}
        <motion.div
          variants={item}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {profile.focus.map((f) => (
            <div key={f.key} className="group bg-ink-2 px-6 py-7">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/40 text-accent transition-colors group-hover:border-accent/40">
                {focusIcons[f.key]}
              </span>
              <div className="font-display text-base font-semibold text-fg">{f.title}</div>
              <div className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
