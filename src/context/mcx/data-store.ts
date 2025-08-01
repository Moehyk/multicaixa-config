import { create } from "zustand";

import type { McxDataStore } from "@/types";

export const useMcxDataStore = create<McxDataStore>((set, get) => ({
  desigEcra: "",
  servicos: [],
  produtos: [],
  getServico: (id?: string) => {
    const servico = get().servicos.find((s) => s.id === id);
    return servico;
  },
  getProduto: (id?: string) => {
    const produto = get().produtos.find((p) => p.id === id);
    return produto;
  },
}));
