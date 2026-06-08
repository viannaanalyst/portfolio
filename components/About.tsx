import { about, education, certifications, profile } from "@/content/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="sobre" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="01">Sobre</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-fg/90 sm:text-xl">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-8 border-t border-line pt-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Formação</h3>
                  <ul className="mt-4 space-y-3">
                    {education.map((e) => (
                      <li key={e.title} className="border-l border-line-strong pl-4">
                        <div className="text-sm font-medium text-fg">{e.title}</div>
                        <div className="font-mono text-xs text-muted">{e.org}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            {profile.photo && (
              <Reveal delay={0.05}>
                <figure className="group relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-line bg-surface/30 lg:mx-0">
                  {/* corner ticks */}
                  <span className="absolute left-3 top-3 z-20 h-4 w-4 border-l border-t border-accent/70" />
                  <span className="absolute right-3 top-3 z-20 h-4 w-4 border-r border-t border-accent/70" />
                  <span className="absolute bottom-3 left-3 z-20 h-4 w-4 border-b border-l border-accent/70" />
                  <span className="absolute bottom-3 right-3 z-20 h-4 w-4 border-b border-r border-accent/70" />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover object-[center_30%] saturate-[0.7] transition-all duration-500 group-hover:saturate-100 group-hover:scale-[1.02]"
                  />
                  {/* blend bottom into ink */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
                  <figcaption className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between font-mono text-xs">
                    <span className="text-fg">{profile.name}</span>
                    <span className="text-accent">// {profile.location.split(",")[0]}</span>
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <Reveal delay={0.18}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Certificações</h3>
                <ul className="mt-4 space-y-2.5">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-2.5 text-sm text-fg/80">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
