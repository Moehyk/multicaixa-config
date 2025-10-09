import { useLayoutEffect, useState, useRef, useCallback } from "react";

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const sentinelRef = useRef<HTMLElement>(null);
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
    if (sentinelRef.current !== null) {
      observer().observe(sentinelRef.current);
    }

    return () => observer().disconnect();
  }, [sentinelRef]);

  return { intersecting, sentinelRef };
};
