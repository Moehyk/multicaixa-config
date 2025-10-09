"use client";

import { useState, useEffect } from "react";

export const useRenderWithAnimation = (
  isVisible: boolean,
  delay: number = 300
) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return shouldRender;
};
