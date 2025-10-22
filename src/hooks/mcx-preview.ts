"use client";

import { useQueryState } from "nuqs";
import { useHandleKeyPress } from "./handle-key-press";
import { mcxPreviewStore, usePreViewStore } from "@/context/mcx";

export const useMcxServicoPreview = () => {
  const [e] = useQueryState("e");
  const { produto } = mcxPreviewStore.getState();
  const { setPreviewViews } = usePreViewStore();

  const textEcra = e ? e.replaceAll("%", " ") : "SERVIÇO";

  const handleClick = () => setPreviewViews("produto");

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key === "1") {
      handleClick();
    }
  };

  useHandleKeyPress(handleKeyDown);

  return {
    textEcra,
    textSeleccao: produto.desigTeclaSeleccao,
    handleClick,
  };
};
