"use client";

import { useHandleKeyPress } from "./handle-key-press";
import { useAppPreviewStore, usePreViewStore } from "@/context/mcx";

export const useMcxServicoPreview = () => {
  const { produto } = useAppPreviewStore();
  const { setPreviewViews } = usePreViewStore();

  const handleClick = () => setPreviewViews("produto");

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key === "1") {
      handleClick();
    }
  };

  useHandleKeyPress(handleKeyDown);

  return {
    textEcra: produto.desigEcra,
    textSeleccao: produto.desigTeclaSeleccao,
    handleClick,
  };
};
