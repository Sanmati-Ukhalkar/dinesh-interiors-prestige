import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type LoadStatus = "idle" | "loading" | "ready" | "error";

export interface FrameSequenceOptions {
  totalFrames: number;
  getFrameUrl: (index: number) => string;
  /** How many frames around current position to keep decoded (default 30) */
  windowSize?: number;
  /** How many frames to preload before showing canvas (default 8) */
  priorityFrames?: number;
}

export interface FrameSequenceResult {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  loadStatus: LoadStatus;
  loadProgress: number;
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useScrollFrameSequence({
  totalFrames,
  getFrameUrl,
  windowSize = 30,
  priorityFrames = 8,
}: FrameSequenceOptions): FrameSequenceResult {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sparse map: frameIndex → HTMLImageElement (windowed — not all frames)
  const imageMapRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // Track in-flight loads to avoid duplicate requests
  const loadingSetRef = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isRenderingRef = useRef(false);
  const totalLoadedRef = useRef(0);

  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrameState] = useState(0);

  // ── Render one frame to canvas ──────────────────────────────────────────────
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imageMapRef.current.get(frameIndex);
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.clientWidth;
    const dh = canvas.clientHeight;

    // Resize canvas backing store to match display size × DPR
    if (
      canvas.width !== Math.round(dw * dpr) ||
      canvas.height !== Math.round(dh * dpr)
    ) {
      canvas.width = Math.round(dw * dpr);
      canvas.height = Math.round(dh * dpr);
      ctx.scale(dpr, dpr);
    }

    // Cover-fit: fill canvas while maintaining image aspect ratio
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = dw / dh;
    let drawW: number, drawH: number, ox: number, oy: number;

    if (imgAspect > canvasAspect) {
      drawH = dh;
      drawW = drawH * imgAspect;
      ox = (dw - drawW) / 2;
      oy = 0;
    } else {
      drawW = dw;
      drawH = drawW / imgAspect;
      ox = 0;
      oy = (dh - drawH) / 2;
    }

    ctx.clearRect(0, 0, dw, dh);
    ctx.drawImage(img, ox, oy, drawW, drawH);
  }, []);

  // ── Evict frames outside sliding window to free memory ─────────────────────
  const evictOutOfWindow = useCallback(
    (center: number) => {
      const half = Math.ceil(windowSize / 2);
      const min = Math.max(0, center - half);
      const max = Math.min(totalFrames - 1, center + half);

      for (const [idx] of imageMapRef.current) {
        if (idx < min || idx > max) {
          imageMapRef.current.delete(idx);
        }
      }
    },
    [totalFrames, windowSize]
  );

  // ── Load a single frame into the sparse map ────────────────────────────────
  const loadFrame = useCallback(
    (index: number): Promise<void> => {
      if (
        imageMapRef.current.has(index) ||
        loadingSetRef.current.has(index)
      ) {
        return Promise.resolve();
      }
      loadingSetRef.current.add(index);

      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameUrl(index + 1); // frames are 1-indexed

        img.onload = () => {
          loadingSetRef.current.delete(index);
          imageMapRef.current.set(index, img);
          totalLoadedRef.current++;
          setLoadProgress(Math.min(1, totalLoadedRef.current / totalFrames));
          if (index === 0) renderFrame(0);
          resolve();
        };

        img.onerror = () => {
          loadingSetRef.current.delete(index);
          totalLoadedRef.current++;
          resolve(); // skip missing frames gracefully
        };
      });
    },
    [getFrameUrl, totalFrames, renderFrame]
  );

  // ── Prefetch sliding window of frames around current position ──────────────
  const prefetchWindow = useCallback(
    (center: number) => {
      evictOutOfWindow(center);
      const half = Math.ceil(windowSize / 2);
      const min = Math.max(0, center - half);
      const max = Math.min(totalFrames - 1, center + half);

      // Load in order of proximity: center outward (ahead priority)
      for (let offset = 0; offset <= half; offset++) {
        const ahead = center + offset;
        const behind = center - offset;
        if (ahead <= max) loadFrame(ahead);
        if (behind >= min && behind !== ahead) loadFrame(behind);
      }
    },
    [totalFrames, windowSize, loadFrame, evictOutOfWindow]
  );

  // ── RAF-throttled frame update + sliding window shift ─────────────────────
  const setCurrentFrame = useCallback(
    (frame: number) => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(frame)));
      if (clamped === currentFrameRef.current) return;
      currentFrameRef.current = clamped;
      setCurrentFrameState(clamped);

      prefetchWindow(clamped);

      if (isRenderingRef.current) return;
      isRenderingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
        isRenderingRef.current = false;
      });
    },
    [totalFrames, renderFrame, prefetchWindow]
  );

  // ── Resize: force canvas resize + redraw ───────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = 0;
      canvas.height = 0;
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // ── Bootstrap: priority frames → ready, then stream rest in background ─────
  useEffect(() => {
    setLoadStatus("loading");
    let hasSetReady = false;

    const bootstrap = async () => {
      // Phase 1 — load first N frames eagerly before revealing canvas
      const priorityCount = Math.min(priorityFrames, totalFrames);
      await Promise.all(
        Array.from({ length: priorityCount }, (_, i) => loadFrame(i))
      );

      if (!hasSetReady) {
        hasSetReady = true;
        setLoadStatus("ready");
        renderFrame(0);
        prefetchWindow(0);
      }

      // Phase 2 — background stream: load remaining frames in small batches
      // with a yield between each to avoid blocking scroll/input
      const BATCH = 8;
      for (let i = priorityCount; i < totalFrames; i += BATCH) {
        await Promise.all(
          Array.from({ length: Math.min(BATCH, totalFrames - i) }, (_, j) =>
            loadFrame(i + j)
          )
        );
        await new Promise<void>((r) => setTimeout(r, 25));
      }
    };

    bootstrap().catch(() => setLoadStatus("error"));

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getFrameUrl, totalFrames, priorityFrames, loadFrame, renderFrame, prefetchWindow]);

  return { canvasRef, loadStatus, loadProgress, currentFrame, setCurrentFrame };
}
