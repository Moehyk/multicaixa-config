import { create } from "zustand";

import type {
  AppPreviewStore,
  AppPreviewStoreActions,
  PagamentoData,
  RecargasData,
  CarregamentoData,
} from "@/types";

export const initialState: AppPreviewStore = {
  desigEcra: "",
  type: "pagamento",
  pagamento: null,
};

export const useAppPreviewStore = create<
  AppPreviewStore & AppPreviewStoreActions
>((set) => ({
  ...initialState,
  setPagamento: (pagamento: PagamentoData) =>
    set({ pagamento, type: "pagamento" }),
  setRecargas: (recargas: RecargasData) => set({ recargas, type: "recargas" }),
  setCarregamento: (carregamento: CarregamentoData) =>
    set({ carregamento, type: "carregamentos" }),
}));
