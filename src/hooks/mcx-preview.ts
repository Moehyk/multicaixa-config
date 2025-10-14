"use client";

import { useHandleKeyPress } from "./handle-key-press";
import {
  mcxPreviewStore,
  usePreViewStore,
  mcxEmpresaStore,
} from "@/context/mcx";

export const useMcxServicoPreview = () => {
  const { getServico } = mcxEmpresaStore();
  const { produto } = mcxPreviewStore.getState();
  const { setPreviewViews } = usePreViewStore();

  const servico = getServico(produto.servicoId);

  const handleClick = () => setPreviewViews("produto");

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key === "1") {
      handleClick();
    }
  };

  useHandleKeyPress(handleKeyDown);

  return {
    textEcra: servico?.desigEcra,
    textSeleccao: produto.desigTeclaSeleccao,
    handleClick,
  };
};
