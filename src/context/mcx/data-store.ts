import { create } from "zustand";

import type { McxEmpresaStore, EmpresaStore } from "@/types";

export const mcxEmpresaStore = create<McxEmpresaStore>((_, get) => ({
  empresa: null,
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

export const initiateEmpresaStore = (data: EmpresaStore) => {
  mcxEmpresaStore.setState({ ...data });
  mcxEmpresaStore().produtos = data.servicos.flatMap((s) => s.produtos);
};
