import { create } from "zustand";

import {
  McxEmpresaView,
  McxServicosView,
  McxProdutoView,
  McxEndView,
} from "@/components/multicaixa";

import type { Views, ViewsStore } from "@/types";

export const useViewsStore = create<ViewsStore>((set) => ({
  id: "",
  McxView: McxEmpresaView,
  setView: (view: Views, id?: string) => {
    switch (view) {
      case "empresa": {
        return set({ McxView: McxEmpresaView });
      }
      case "servico": {
        return set({ McxView: McxServicosView, id: id });
      }
      case "produto": {
        return set({ McxView: McxProdutoView, id: id });
      }
      case "end": {
        return set({ McxView: McxEndView });
      }
      default:
        return set({ McxView: McxEmpresaView });
    }
  },
}));
