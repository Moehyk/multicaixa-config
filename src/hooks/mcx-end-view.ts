"use client";

import { useEffect } from "react";
import { useMcxData } from "./mcx-data";
import { useResetMcx, useCloseMcxModal } from "./reset-mcx";
import { useEndViewStore, mcxPreviewStore } from "@/context/mcx";

import type { ProdutoData, McxProdutoPreview } from "@/types";

const renderDesigEcra = (
  data: ProdutoData | undefined,
  state: McxProdutoPreview
) => {
  if (data) {
    return data.desigEcra;
  }

  if (state.desigEcra) {
    return state.desigEcra;
  }

  return "[Designação p/ Ecrã]";
};

export const useMcxEndView = () => {
  const { produto } = useMcxData();
  const { produto: previewProduto } = mcxPreviewStore.getState();
  const { montante, referencia, unidades } = useEndViewStore();
  const reset = useResetMcx();
  const closeModal = useCloseMcxModal();

  const produtoDesigEcra = renderDesigEcra(produto, previewProduto);

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
    produtoDesigEcra,
    montante,
    referencia,
    unidades,
    closeModal,
    reset,
  };
};
