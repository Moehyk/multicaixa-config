import { create } from "zustand";

import type { ViewEndStoreData, ViewEndStore } from "@/types";

export const endStoreInitialState: ViewEndStoreData = {
  ecraTexto: "",
  montante: 0,
  unidades: undefined,
  referencia: undefined,
};

export const useEndStore = create<ViewEndStore>((set) => ({
  ...endStoreInitialState,
  setMontante: (montante: number) => set({ montante }),
  setEcraTexto: (ecraTexto: string) => set({ ecraTexto }),
  setUnidades: (unidades: string) => set({ unidades }),
  setReferencia: (referencia: string) => set({ referencia }),
}));

export const resetEndStore = useEndStore.setState(endStoreInitialState);
