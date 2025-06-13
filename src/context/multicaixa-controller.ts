import { create } from "zustand";

import type { DataModel, Views } from "@/types";

type State = {
  view: Views;
  desigEcra: string;
  ecraSecondary: string;
  servicoId?: string;
  produtoId?: string;
  carregamentoId?: string;
  recargasId?: string;
};

export const initialState: State = {
  view: "empresa",
  desigEcra: "",
  ecraSecondary: "",
};

export const useMulticaixaController = create<State>((set) => ({
  ...initialState,
}));
