"use client";

import { createContext } from "react";
import { createStore } from "zustand";

import type { McxDataProps, McxDataState } from "@/types";

export type McxDataStore = ReturnType<typeof createEmpresaStore>;

export const createEmpresaStore = (initProps?: Partial<McxDataProps>) => {
  const DEFAULT_PROPS: McxDataProps = {
    empresa: null,
    servicos: [],
    produtos: [],
  };

  return createStore<McxDataState>((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    getServico: (id?: string) => {
      const servico = get().servicos.find((s) => s.id === id);
      return servico;
    },
    getProduto: (id?: string) => {
      const produto = get().produtos.find((p) => p.id === id);
      return produto;
    },
  }));
};

export const McxDataContext = createContext<McxDataStore | null>(null);
