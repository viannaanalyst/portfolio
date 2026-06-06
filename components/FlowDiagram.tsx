"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import type { FlowDiagram as FlowDiagramType, FlowStageKind } from "@/content/data";

const ic = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const kindIcon: Record<FlowStageKind, React.ReactNode> = {
  trigger: (
    <svg {...ic}>
      <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z" />
    </svg>
  ),
  process: (
    <svg {...ic}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14M7 10v4.5a3 3 0 0 0 3 3h4" />
    </svg>
  ),
  ai: (
    <svg {...ic}>
      <path d="M12 3l1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3z" />
      <path d="M18 14l.7 1.8L20.5 16.5l-1.8.7L18 19l-.7-1.8L15.5 16.5l1.8-.7L18 14z" />
    </svg>
  ),
  decision: (
    <svg {...ic}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9c0 6-12 3-12 6" />
    </svg>
  ),
  output: (
    <svg {...ic}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  notify: (
    <svg {...ic}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
};

const kindLabel: Record<FlowStageKind, string> = {
  trigger: "trigger",
  process: "processo",
  ai: "ia",
  decision: "decisão",
  output: "saída",
  notify: "alerta",
};

// ── layout ───────────────────────────────────────────────────────────────
const NODE = 50;
const MIN_COL = 168;
const LABEL_W = 150;
const PAD = 26;
const ROW_Y = 40;
const BRANCH_DY = 140;
const STEP_MS = 430;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function FlowDiagram({ diagram }: { diagram: FlowDiagramType }) {
  const stages = diagram.stages;
  const hasBranch = stages.some((s) => s.branch);
  const n = stages.length;

  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cursor = useAnimationControls();
  const runningRef = useRef(false);

  const [avail, setAvail] = useState(880);
  const [runIndex, setRunIndex] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "cursor" | "running" | "done">("idle");
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setAvail(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const naturalCol = n > 1 ? (avail - 2 * PAD - LABEL_W) / (n - 1) : 0;
  const COL = Math.max(MIN_COL, Math.floor(naturalCol));
  const contentWidth = 2 * PAD + (n - 1) * COL + LABEL_W;
  const width = Math.max(contentWidth, avail);
  const height = (hasBranch ? ROW_Y + BRANCH_DY + NODE : ROW_Y + NODE) + 124;

  const nodes = stages.map((s, i) => ({ ...s, x: PAD + i * COL, y: ROW_Y }));

  const port = (nx: number, ny: number, side: "out" | "in" | "bottom") => {
    if (side === "in") return { x: nx, y: ny + NODE / 2 };
    if (side === "out") return { x: nx + NODE, y: ny + NODE / 2 };
    return { x: nx + NODE / 2, y: ny + NODE };
  };

  const inViewRef = useRef(false);
  const loopActiveRef = useRef(false);

  const runOnce = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setPhase("cursor");
    setRunIndex(-1);
    await cursor.start({ opacity: 1, transition: { duration: 0.25 } });
    const c = containerRef.current?.getBoundingClientRect();
    const b = btnRef.current?.getBoundingClientRect();
    if (c && b) {
      await cursor.start({
        x: b.left - c.left + b.width / 2 - 3,
        y: b.top - c.top + b.height / 2 - 2,
        transition: { duration: 0.85, ease: [0.5, 0, 0.2, 1] },
      });
    }
    setClicking(true);
    await delay(170);
    setClicking(false);
    setPhase("running");
    for (let i = 0; i < n; i++) {
      setRunIndex(i);
      await delay(STEP_MS);
    }
    setRunIndex(n);
    setPhase("done");
    await cursor.start({ opacity: 0, transition: { duration: 0.3 } });
    await delay(2400);
    setPhase("idle");
    setRunIndex(-1);
    runningRef.current = false;
  }, [n, cursor]);

  // loop: roda em sequência enquanto o diagrama estiver visível, com pausa entre execuções
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const loop = async () => {
      if (loopActiveRef.current) return;
      loopActiveRef.current = true;
      while (!cancelled && inViewRef.current) {
        await runOnce();
        if (cancelled || !inViewRef.current) break;
        await delay(2000); // pausa entre as execuções
      }
      loopActiveRef.current = false;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        inViewRef.current = visible;
        if (visible) loop();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [runOnce]);

  return (
    <div ref={containerRef} className="relative rounded-2xl border border-line bg-ink/50">
      {diagram.sources && diagram.sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-2">
            Entrada · {diagram.sources.length} fontes:
          </span>
          {diagram.sources.map((s) => (
            <span key={s} className="rounded-md border border-line bg-surface/40 px-2 py-0.5 font-mono text-[0.7rem] text-fg/70">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* toast de sucesso */}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="pointer-events-none absolute left-1/2 top-14 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-2 font-mono text-sm text-accent backdrop-blur">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Execução concluída com sucesso
          </div>
        </motion.div>
      )}

      <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden">
        <div className="bg-dots relative" style={{ width, height, minWidth: "100%" }}>
          <svg className="absolute inset-0" width={width} height={height} fill="none">
            {nodes.slice(0, -1).map((node, i) => {
              const a = port(node.x, node.y, "out");
              const b = port(nodes[i + 1].x, nodes[i + 1].y, "in");
              const dx = (b.x - a.x) * 0.5;
              const active = runIndex >= i + 1;
              return (
                <g key={`edge-${i}`} opacity={active ? 0.95 : 0.4}>
                  <path
                    d={`M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x - 7} ${b.y}`}
                    stroke="var(--color-accent)"
                    strokeWidth={active ? 2.2 : 1.6}
                    className="dash-flow"
                  />
                  <path
                    d={`M ${b.x - 9} ${b.y - 4} L ${b.x - 2} ${b.y} L ${b.x - 9} ${b.y + 4}`}
                    stroke="var(--color-accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}
            {nodes.map((node, i) =>
              node.branch ? (
                (() => {
                  const a = port(node.x, node.y, "bottom");
                  const bx = node.x + NODE / 2;
                  const by = ROW_Y + BRANCH_DY;
                  return (
                    <g key={`branch-${i}`} opacity={runIndex >= i ? 0.85 : 0.45}>
                      <path
                        d={`M ${a.x} ${a.y} C ${a.x} ${a.y + 40}, ${bx} ${by - 40}, ${bx} ${by - 8}`}
                        stroke="var(--color-accent)"
                        strokeWidth="1.4"
                        className="dash-flow"
                      />
                      <path
                        d={`M ${bx - 4} ${by - 10} L ${bx} ${by - 3} L ${bx + 4} ${by - 10}`}
                        stroke="var(--color-accent)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })()
              ) : null
            )}
          </svg>

          {nodes.map((node, i) => {
            const accentKind = node.kind === "ai" || node.kind === "decision" || node.kind === "trigger";
            const lit = runIndex >= i;
            const isRunning = phase === "running" && runIndex === i;
            return (
              <div key={node.label} className="absolute" style={{ left: node.x, top: node.y, width: NODE }}>
                <div
                  className={`flex items-center justify-center rounded-xl border transition-colors duration-200 ${
                    lit
                      ? "border-accent bg-accent/20 text-accent"
                      : accentKind
                        ? "border-accent/45 bg-accent/[0.07] text-accent"
                        : "border-line-strong bg-surface text-fg/80"
                  } ${isRunning ? "ring-2 ring-accent/70" : ""}`}
                  style={{ width: NODE, height: NODE, boxShadow: lit ? "0 0 18px rgba(204,255,77,0.35)" : undefined }}
                >
                  {kindIcon[node.kind]}
                </div>
                <div className="mt-2" style={{ width: LABEL_W }}>
                  <div className={`font-mono text-[0.6rem] uppercase tracking-widest ${accentKind || lit ? "text-accent" : "text-muted-2"}`}>
                    {kindLabel[node.kind]}
                  </div>
                  <div className="mt-0.5 text-[0.8rem] font-medium leading-tight text-fg">{node.label}</div>
                  {node.detail && <div className="mt-1 text-[0.72rem] leading-snug text-muted">{node.detail}</div>}
                </div>
              </div>
            );
          })}

          {nodes.map((node, i) =>
            node.branch ? (
              <div key={`bn-${node.label}`} className="absolute" style={{ left: node.x, top: ROW_Y + BRANCH_DY, width: NODE }}>
                <div
                  className="flex items-center justify-center rounded-xl border border-dashed border-line-strong bg-ink-2 text-muted"
                  style={{ width: NODE, height: NODE }}
                >
                  {kindIcon.notify}
                </div>
                <div className="mt-2" style={{ width: LABEL_W }}>
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-2">alerta</div>
                  <div className="mt-0.5 text-[0.8rem] font-medium leading-tight text-muted">{node.branch}</div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* rodapé: escala real + botão executar */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-2">
          <span className="port-pulse inline-block h-2 w-2 rounded-full bg-accent" />
          {diagram.scaleLabel ? (
            <span>{diagram.scaleLabel}</span>
          ) : (
            <>
              {diagram.nodeCount && <span>{diagram.nodeCount} nós</span>}
              {diagram.nodeCount && diagram.connectionCount && <span>·</span>}
              {diagram.connectionCount && <span>{diagram.connectionCount} conexões</span>}
              <span className="hidden text-muted-2/70 sm:inline">no n8n · simplificado</span>
            </>
          )}
        </div>

        <button
          ref={btnRef}
          onClick={runOnce}
          disabled={phase !== "idle"}
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
            phase === "running"
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-accent/50 bg-accent/[0.08] text-accent hover:bg-accent/15"
          } disabled:cursor-default`}
        >
          {phase === "running" ? (
            <>
              <span className="port-pulse inline-block h-2 w-2 rounded-full bg-accent" />
              Executando…
            </>
          ) : phase === "done" ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Concluído
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {diagram.runLabel ?? "Executar workflow"}
            </>
          )}
        </button>
      </div>

      {/* cursor simulado */}
      <motion.div
        animate={cursor}
        initial={{ opacity: 0, x: 90, y: Math.round(height * 0.5) }}
        className="pointer-events-none absolute left-0 top-0 z-50"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}
      >
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path d="M2 1.5 L2 16.5 L6.2 12.6 L9.2 19.2 L11.8 18.1 L8.8 11.6 L14.5 11.2 Z" fill="#f4f7f8" stroke="#0a0d10" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        {clicking && <span className="absolute left-0.5 top-1 inline-block h-5 w-5 animate-ping rounded-full border-2 border-accent" />}
      </motion.div>
    </div>
  );
}
