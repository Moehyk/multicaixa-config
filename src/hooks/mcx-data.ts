"use client";

import { useContext } from "react";
import { useStore } from "zustand";

import { McxDataContext, useViewsStore } from "@/context/mcx";

export const useMcxData = () => {
  const { id } = useViewsStore();
  const mcxDataStore = useContext(McxDataContext);

  if (!mcxDataStore)
    throw new Error("Missing McxDataContext.Provider in the tree");

  const { getServico, getProduto, empresa, servicos, produtos } =
    useStore(mcxDataStore);

  const servico = getServico(id);
  const produto = getProduto(id);

  return { servico, produto, empresa, servicos, produtos };
};
