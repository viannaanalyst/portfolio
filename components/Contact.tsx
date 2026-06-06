import { profile } from "@/content/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Contact() {
  const github: string = profile.github;
  const links = [
    { label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: "/in/viannadev", href: profile.linkedin },
    { label: "Telefone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
    ...(github
      ? [{ label: "GitHub", value: github.replace("https://", ""), href: github }]
      : []),
    {
      label: "Localização",
      value: profile.location,
      href: `https://www.google.com/maps/search/${encodeURIComponent(profile.location)}`,
    },
  ];

  // grade sem buracos: nº de colunas = nº de itens
  const gridCols =
    links.length >= 5
      ? "lg:grid-cols-5"
      : links.length === 4
        ? "lg:grid-cols-4"
        : "lg:grid-cols-3";

  return (
    <section id="contato" className="relative overflow-hidden border-t border-line py-24 sm:py-36">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent/[0.08] blur-[130px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="05">Contato</SectionLabel>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-10 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            Tem um processo manual que <span className="text-accent glow-accent">deveria rodar sozinho?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Estou aberto a oportunidades em dados e automação. Vamos conversar.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Enviar uma mensagem
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        <div className={`mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${gridCols}`}>
          {links.map((l, i) => (
            <Reveal key={l.label} delay={0.1 + i * 0.05} className="bg-ink-2">
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-surface/30"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">{l.label}</span>
                <span className="flex items-center gap-2 text-sm font-medium text-fg transition-colors group-hover:text-accent">
                  {l.value}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 transition-opacity group-hover:opacity-100">
                    <path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 font-mono text-xs text-muted-2 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Construído com Next.js · Tailwind · Framer Motion</span>
        </footer>
      </div>
    </section>
  );
}
