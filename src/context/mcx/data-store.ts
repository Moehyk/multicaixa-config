import { create } from "zustand";

import type { McxDataStore, DataStore } from "@/types";

export const mcxDataStore = create<McxDataStore>((_, get) => ({
  id: "",
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
  mcxDataStore().servicos = data.servicos;
  mcxDataStore().produtos = data.servicos.flatMap((s) => s.produtos);
  mcxDataStore().desigEcra = data.desigEcra;
  mcxDataStore().nome = data.nome;
};
