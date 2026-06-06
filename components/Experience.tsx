import { experience } from "@/content/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experiencia" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="04">Experiência</SectionLabel>
        </Reveal>

        <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.08} className="bg-ink-2">
              <div className="group grid gap-4 p-7 sm:grid-cols-[1fr_1.6fr] sm:gap-10 sm:p-9">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-fg">{e.org}</h3>
                  <div className="mt-1 text-sm text-accent">{e.role}</div>
                  {e.period && (
                    <div className="mt-1 font-mono text-xs text-muted-2">{e.period}</div>
                  )}
                </div>
                <div>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{e.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-surface/50 px-2 py-1 font-mono text-[0.7rem] text-fg/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
