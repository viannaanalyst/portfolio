import { skills } from "@/content/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const groupIcons: Record<string, React.ReactNode> = {
  // BI & Visualização — gráfico de barras
  viz: (
    <svg {...iconProps}>
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" />
      <rect x="12" y="8" width="3" height="10" />
      <rect x="17" y="4" width="3" height="14" />
    </svg>
  ),
  // Dados & Bancos — cilindro de banco de dados
  data: (
    <svg {...iconProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  // Automação & Integração — nós conectados (estilo n8n)
  automation: (
    <svg {...iconProps}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
      <path d="M7.2 6.8 16.8 11M7.2 17.2 16.8 13" />
    </svg>
  ),
  // IA & Processamento de Documentos — documento + faísca
  ai: (
    <svg {...iconProps}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9" />
      <path d="M8 8h4M8 12h6M8 16h3" />
      <path d="M17.5 2.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" />
    </svg>
  ),
};

export function Skills() {
  // flatten para o ticker
  const ticker = skills.flatMap((g) => g.items);

  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="02">Stack & Skills</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06} className="bg-ink-2">
              <div className="group h-full p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/40 text-accent transition-colors group-hover:border-accent/40">
                      {groupIcons[group.tag]}
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-tight text-fg">{group.label}</h3>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-accent">/{group.tag}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-sm text-fg/85 transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* full-bleed marquee ticker */}
      <div className="relative mt-16 flex overflow-hidden border-y border-line py-5">
        <div className="marquee-track flex shrink-0 items-center gap-8 pr-8 font-mono text-sm uppercase tracking-wider text-muted">
          {[...ticker, ...ticker].map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              {s}
              <span className="text-accent">+</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
