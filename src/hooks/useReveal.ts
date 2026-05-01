import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and `shown` boolean.
 * Once the element enters the viewport, `shown` becomes true and stays true.
 * @param threshold – fraction of element that must be visible (default 0.1)
 * @param rootMargin – negative bottom margin delays trigger until element is more "in" view
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = "0px 0px -8% 0px"
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, shown]);

  return { ref, shown };
}
