import { create } from "zustand";

import type { DataModel } from "@/types";

type State = {
  view: DataModel;
  desigEcra: string;
  ecraSecondary: string;
};

export const initialState: State = {
  view: "empresa",
  desigEcra: "",
  ecraSecondary: "",
};

export const useMulticaixaController = create<State>((set) => ({
  ...initialState,
}));
