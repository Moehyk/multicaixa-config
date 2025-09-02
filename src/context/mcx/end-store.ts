import { create } from "zustand";

import type { ViewEndStore } from "@/types";

export const endStoreInitialState: ViewEndStore = {
  ecraTexto: "",
  montante: 0,
  unidades: "",
  referencia: "",
};

export const useEndStore = create<ViewEndStore>(() => ({
  ...endStoreInitialState,
}));

export const resetEndStore = useEndStore.setState(endStoreInitialState);
