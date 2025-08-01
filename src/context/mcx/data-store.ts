import { create } from "zustand";

import type { EmpresaMcxStore, ServicoStore } from "@/types";

export const useEmpresaStore = create<EmpresaMcxStore>((set, get) => ({
  desigEcra: "",
  servicos: [],
  getServico: (id?: string) => {
    const servico = get().servicos.find((s) => s.id === id);
    return servico;
  },
}));

export const useServicoStore = create<ServicoStore>((set, get) => ({
  id: "",
  desigEcra: "",
  produtos: [],
  setProdutos: (id: string) => {
    const produtos = get().produtos;
    set({ produtos: produtos.filter((p) => p.id === id) });
  },
  setId: (id?: string) => set({ id }),
}));
