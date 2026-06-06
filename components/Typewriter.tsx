"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 35,
  holdFull = 1600,
  holdEmpty = 350,
}: {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdFull?: number;
  holdEmpty?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return; // sem animação: mostra a 1ª frase estática

    const current = phrases[index % phrases.length];

    // pausa no fim da palavra antes de apagar
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdFull);
      return () => clearTimeout(t);
    }

    // pausa ao esvaziar antes de digitar a próxima
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, holdEmpty);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduce, typeSpeed, deleteSpeed, holdFull, holdEmpty]);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span className="whitespace-nowrap">{reduce ? phrases[0] : text}</span>
      {!reduce && (
        <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-accent caret-blink" />
      )}
    </span>
  );
}
