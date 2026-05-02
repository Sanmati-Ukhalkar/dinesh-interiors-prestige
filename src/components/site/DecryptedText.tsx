/**
 * DecryptedText — character scramble that decodes on scroll-into-view.
 * Performance: setInterval only active during ~500ms animation window.
 * IntersectionObserver triggers once. Zero idle cost.
 */
import { useEffect, useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface DecryptedTextProps {
  text: string;
  speed?: number;        // ms per interval tick
  className?: string;
  encryptedClassName?: string;
  revealDirection?: "start" | "end" | "center";
  animateOn?: "view" | "hover";
}

const DecryptedText = ({
  text,
  speed = 40,
  className = "",
  encryptedClassName = "opacity-40",
  revealDirection = "start",
  animateOn = "view",
}: DecryptedTextProps) => {
  const [display, setDisplay] = useState(text);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animatedOnce = useRef(false);

  const shuffle = useCallback((orig: string, revealedSet: Set<number>) =>
    orig.split("").map((ch, i) => {
      if (ch === " ") return " ";
      if (revealedSet.has(i)) return orig[i];
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join(""),
    []
  );

  const getNextIndex = useCallback((revealedSet: Set<number>): number => {
    const len = text.length;
    if (revealDirection === "start") return revealedSet.size;
    if (revealDirection === "end") return len - 1 - revealedSet.size;
    // center
    const mid = Math.floor(len / 2);
    const offset = Math.floor(revealedSet.size / 2);
    const idx = revealedSet.size % 2 === 0 ? mid + offset : mid - offset - 1;
    if (idx >= 0 && idx < len && !revealedSet.has(idx)) return idx;
    for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
    return 0;
  }, [text.length, revealDirection]);

  const triggerDecrypt = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let currentRevealed = new Set<number>();
    setDone(false);
    setRevealed(currentRevealed);

    intervalRef.current = setInterval(() => {
      if (currentRevealed.size >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
        setDone(true);
        return;
      }
      const nextIdx = getNextIndex(currentRevealed);
      currentRevealed = new Set(currentRevealed);
      currentRevealed.add(nextIdx);
      setRevealed(new Set(currentRevealed));
      setDisplay(shuffle(text, currentRevealed));
    }, speed);
  }, [text, speed, shuffle, getNextIndex]);

  // Scroll into view trigger
  useEffect(() => {
    if (animateOn !== "view") return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedOnce.current) {
          animatedOnce.current = true;
          triggerDecrypt();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animateOn, triggerDecrypt]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const hoverProps = animateOn === "hover"
    ? { onMouseEnter: triggerDecrypt, onMouseLeave: () => { clearInterval(intervalRef.current!); setDisplay(text); setDone(true); } }
    : {};

  return (
    <span ref={containerRef} style={{ display: "inline" }} {...hoverProps} aria-label={text}>
      <span aria-hidden="true">
        {display.split("").map((char, i) => {
          const isRevealed = revealed.has(i) || done;
          return (
            <span key={i} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default DecryptedText;
