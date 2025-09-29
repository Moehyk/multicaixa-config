import { create } from "zustand";
import {
  usePagamentoFormContext,
  useCarregamentoFormContext,
  useRecargasFormContext,
} from "@/context/forms";

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

const setAppPreviewPagamento = useAppPreviewStore.getState().setPagamento;
const setAppPreviewRecargas = useAppPreviewStore.getState().setRecargas;
const setAppPreviewCarregamento = useAppPreviewStore.getState().setCarregamento;

export const useAppPagamentoPreview = () => {
  const pagamentoContext = usePagamentoFormContext();
  const { desigEcra, pagamento } = pagamentoContext.getValues();
  useAppPreviewStore.setState({ desigEcra });

  return () => setAppPreviewPagamento(pagamento!);
};

export const useAppRecargasPreview = () => {
  const recargasContext = useRecargasFormContext();
  const { desigEcra, recargas } = recargasContext.getValues();
  useAppPreviewStore.setState({ desigEcra });

  return () => setAppPreviewRecargas(recargas!);
};

export const useAppCarregamentoPreview = () => {
  const carregamentoContext = useCarregamentoFormContext();
  const { desigEcra, carregamento } = carregamentoContext.getValues();
  useAppPreviewStore.setState({ desigEcra });

  return () => setAppPreviewCarregamento(carregamento!);
};
