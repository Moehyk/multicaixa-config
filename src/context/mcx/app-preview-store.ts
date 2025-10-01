import { create } from "zustand";

import type {
  ProdutoData,
  McxPreviewStore,
  PagamentoData,
  RecargasData,
  CarregamentoData,
} from "@/types";

export const initialState: ProdutoData = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  desigEcra: "",
  desigTeclaSeleccao: "",
  type: "pagamento",
  pagamento: {
    montanteMin: 0,
    montanteMax: 0,
    desigReferencia: "",
    textoEcraReferencia: "",
    id: "",
    isNew: true,
    tamanhoReferencia: 0,
  },
  servico: {
    desigSistema: "",
  },
  servicoId: "",
};

export const useAppPreviewStore = create<McxPreviewStore>((set) => ({
  produto: initialState,
}));
