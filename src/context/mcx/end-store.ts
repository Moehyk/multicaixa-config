import { create } from "zustand";

import type { ViewEndStoreData, ViewEndStore } from "@/types";

export const endStoreInitialState: ViewEndStoreData = {
  ecraTexto: "",
  montante: "",
  unidades: undefined,
  referencia: undefined,
};

export const useEndStore = create<ViewEndStore>((set) => ({
  ...endStoreInitialState,
  setMontante: (montante: string) => set({ montante }),
  setEcraTexto: (ecraTexto: string) => set({ ecraTexto }),
  setUnidades: (unidades: string) => set({ unidades }),
  setReferencia: (referencia: string) => set({ referencia }),
}));

export const resetEndStore = useEndStore.setState(endStoreInitialState);
