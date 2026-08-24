"use client";

import { useEffect } from "react";

/** Registers a service worker scoped to /atelier only. */
export function AtelierServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (!window.location.pathname.startsWith("/atelier")) return;

    navigator.serviceWorker
      .register("/atelier/sw.js", { scope: "/atelier/" })
      .catch(() => {
        // Installability still works on HTTPS once SW is accepted.
      });
  }, []);

  return null;
}
