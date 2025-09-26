/** biome-ignore-all lint/nursery/noShadow: <explanation> */
"use client";

import { useEffect, useState } from "react";

export function useSlides<T>(slides: T[], delay = 8000, offset = 100) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearInterval(timer);
  }, [slides.length, delay]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return { index, setIndex, next, prev, offset };
}
