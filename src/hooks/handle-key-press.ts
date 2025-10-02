"use client";

import { useEffect } from "react";

export const useHandleKeyPress = (
  handleKeyDown: (e: globalThis.KeyboardEvent) => void
) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
