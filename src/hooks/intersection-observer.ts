import { useLayoutEffect, useState, useRef, useCallback } from "react";
import { empresaDisplayerRefStore } from "@/context/empresa-displayer-ref";

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const { ref } = empresaDisplayerRefStore();
  const [intersecting, setIntersecting] = useState(true);

  const observer = useCallback(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        } else {
          setIntersecting(false);
        }
      }, options),
    [setIntersecting]
  );

  useLayoutEffect(() => {
    if (ref.current !== null) {
      observer().observe(ref.current);
    }

    return () => observer().disconnect();
  }, [ref]);

  return { intersecting };
};
