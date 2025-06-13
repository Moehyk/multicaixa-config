import { create } from "zustand";

import type { DataModel } from "@/types";

type State = {
  view: DataModel;
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
