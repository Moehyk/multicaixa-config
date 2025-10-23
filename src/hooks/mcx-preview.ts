"use client";

import { useSearchParams } from "next/navigation";
import { useHandleKeyPress } from "./handle-key-press";
import { mcxPreviewStore, usePreViewStore } from "@/context/mcx";

export const useMcxServicoPreview = () => {
  const servicoDesigEcra = useSearchParams().get("s");
  const { produto } = mcxPreviewStore.getState();
  const { setPreviewViews } = usePreViewStore();

  const textEcra = servicoDesigEcra
    ? servicoDesigEcra.replaceAll("%", " ")
    : "SERVIÇO";

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
