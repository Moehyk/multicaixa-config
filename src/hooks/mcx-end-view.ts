"use client";

import { useEffect } from "react";
import { useMcxData } from "./useMcxData";
import { useResetMcx } from "./reset-mcx";
import { useEndViewStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";

export const useMcxEndView = () => {
  const { produto } = useMcxData();
  const { montante, referencia, unidades } = useEndViewStore();
  const reset = useResetMcx();

  const openReciboModal = () =>
    openContextModal({
      modal: "mcx-recibo",
      innerProps: {},
    });

  useEffect(() => {
    const keyPressHandler = (e: globalThis.KeyboardEvent) => {
      const key = e.key;

      if (key === "1") {
        reset();
      }
      if (key === "2") {
        openReciboModal();
      }
    };

    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, []);

  return {
    produto,
    montante,
    referencia,
    unidades,
    reset,
    openReciboModal,
  };
};
