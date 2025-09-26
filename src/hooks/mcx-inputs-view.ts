"use client";

import { useEffect } from "react";
import { useResetMcx } from "./reset-mcx";

export const useMcxInputsView = (
  onContinue: () => void,
  onClear: () => void
) => {
  const reset = useResetMcx();

  useEffect(() => {
    const keyPressHandler = (e: globalThis.KeyboardEvent) => {
      const key = e.key;

      if (key === "z") {
        reset();
      }
      if (key === "x") {
        onClear();
      }
      if (key === "c") {
        onContinue();
      }
    };

    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [onContinue, onClear, reset]);

  return reset;
};
