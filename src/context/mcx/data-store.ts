import { create } from "zustand";

import type { McxDataStore, DataStore } from "@/types";

export const useMcxDataStore = create<McxDataStore>((_, get) => ({
  nome: "",
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

export const initiateDataStore = (data: DataStore) => {
  useMcxDataStore().servicos = data.servicos;
  useMcxDataStore().produtos = data.servicos.flatMap((s) => s.produtos);
  useMcxDataStore().desigEcra = data.desigEcra;
  useMcxDataStore().nome = data.nome;
};
