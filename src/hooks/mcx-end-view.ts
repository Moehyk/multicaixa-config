"use client";

import { useEffect } from "react";
import { useMcxData } from "./useMcxData";
import { useResetMcx, useCloseMcxModal } from "./reset-mcx";
import { useEndViewStore } from "@/context/mcx";

export const useMcxEndView = () => {
  const { produto } = useMcxData();
  const { montante, referencia, unidades } = useEndViewStore();
  const reset = useResetMcx();
  const closeModal = useCloseMcxModal();

  useEffect(() => {
    const keyPressHandler = (e: globalThis.KeyboardEvent) => {
      const key = e.key;

      if (key === "1") {
        reset();
      }
      if (key === "2") {
        closeModal();
      }
    };

    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [reset, closeModal]);

  return {
    produto,
    montante,
    referencia,
    unidades,
    closeModal,
    reset,
  };
};
