"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/content/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";

function FlowNode({ label, kind }: { label: string; kind: "in" | "process" | "out" }) {
  const accent = kind === "process";
  return (
    <div
      className={`relative flex-1 rounded-xl border px-4 py-3 text-center ${
        accent ? "border-accent/40 bg-accent/[0.06]" : "border-line bg-surface/40"
      }`}
    >
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-2">
        {kind === "in" ? "input" : kind === "process" ? "process" : "output"}
      </div>
      <div className={`mt-1 text-sm font-medium ${accent ? "text-accent" : "text-fg/90"}`}>{label}</div>
    </div>
  );
}

function Connector() {
  return (
    <svg className="hidden h-6 w-10 shrink-0 sm:block" viewBox="0 0 40 24" fill="none" aria-hidden>
      <line x1="0" y1="12" x2="40" y2="12" stroke="var(--color-accent)" strokeWidth="1.5" className="dash-flow" opacity="0.6" />
      <path d="M34 7l6 5-6 5" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={(index % 2) * 0.06}>
      <div
        className={`group relative overflow-hidden rounded-2xl border bg-ink-2 transition-colors ${
          open ? "border-accent/40" : "border-line hover:border-line-strong"
        }`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer flex-col gap-6 p-6 text-left sm:p-8"
          aria-expanded={open}
        >
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                {project.category}
              </span>
              <span className="font-mono text-xs text-muted-2">{project.year}</span>
            </div>
            <span
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 ${
                open ? "rotate-45 border-accent text-accent" : "group-hover:text-fg"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          {/* title + summary */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
          </div>

          {/* flow */}
          <div className="flex items-center gap-2">
            <FlowNode label={project.flow.in} kind="in" />
            <Connector />
            <FlowNode label={project.flow.process} kind="process" />
            <Connector />
            <FlowNode label={project.flow.out} kind="out" />
          </div>

          {/* metric + stack */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-md bg-surface/50 px-2 py-1 font-mono text-[0.7rem] text-fg/70">
                  {s}
                </span>
              ))}
            </div>
            {project.metric && (
              <div className="text-right">
                <div className="font-mono text-xl font-medium text-accent glow-accent">{project.metric}</div>
                <div className="text-xs text-muted-2">{project.metricLabel}</div>
              </div>
            )}
          </div>
        </button>

        {/* expandable detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line px-6 py-7 sm:px-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">O problema</h4>
                    <p className="mt-3 text-sm leading-relaxed text-fg/80">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">A solução</h4>
                    <p className="mt-3 text-sm leading-relaxed text-fg/80">{project.solution}</p>
                  </div>
                </div>

                {project.apis.length > 0 && (
                  <div className="mt-7 border-t border-line pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">APIs & Integrações</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.apis.map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/[0.05] px-2.5 py-1.5 text-sm text-fg/90"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-accent"
                          >
                            <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                            <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.diagram && (
                  <div className="mt-7 border-t border-line pt-6">
                    <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      Arquitetura do fluxo
                    </h4>
                    <FlowDiagram diagram={project.diagram} />
                  </div>
                )}

                {project.media && (
                  <div className="mt-7 border-t border-line pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">Fluxo</h4>
                    <figure className="mt-3 overflow-hidden rounded-xl border border-line bg-surface/30">
                      {project.media.type === "video" ? (
                        <video
                          src={project.media.src}
                          className="w-full"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.media.src}
                          alt={project.media.caption ?? project.title}
                          className="w-full"
                        />
                      )}
                      {project.media.caption && (
                        <figcaption className="border-t border-line px-4 py-2 font-mono text-xs text-muted-2">
                          {project.media.caption}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projetos" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="03">Projetos & Cases</SectionLabel>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-xl text-muted">
            Automações e pipelines reais em produção. Clique em cada um para ver o problema e a
            solução. <span className="text-fg/70">Todos os dados foram sanitizados.</span>
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
