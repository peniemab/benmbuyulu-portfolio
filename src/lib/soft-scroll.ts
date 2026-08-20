const EASE_IN_OUT_CUBIC = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function durationFromDistance(distancePx: number) {
  const screens = distancePx / Math.max(window.innerHeight, 1);
  // Near: ~0.5s · ~1 viewport: ~1s · far: capped ~1.65s
  return Math.min(1650, Math.max(500, 520 + screens * 480));
}

let scrollToken = 0;

/**
 * Soft in-page scroll; duration scales with how far the section is.
 * Uses instant per-frame scrollTo so CSS smooth-scroll cannot fight the animation.
 */
export function softScrollToHash(
  hash: string,
  options?: { durationMs?: number },
) {
  if (typeof window === "undefined") return;

  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView();
    return;
  }

  const startY = window.scrollY;
  const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const targetY =
    el.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) return;

  const duration =
    options?.durationMs ?? durationFromDistance(Math.abs(delta));
  const start = performance.now();
  const token = ++scrollToken;

  const step = (now: number) => {
    if (token !== scrollToken) return;

    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo({
      top: startY + delta * EASE_IN_OUT_CUBIC(t),
      left: 0,
      behavior: "instant",
    });
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
