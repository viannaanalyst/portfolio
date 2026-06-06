import type { ReactNode } from "react";

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
