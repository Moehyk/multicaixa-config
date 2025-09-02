import { create } from "zustand";

import {
  McxEmpresaView,
  McxServicosView,
  McxProdutoView,
} from "@/components/multicaixa";

import type { JSXElementConstructor } from "react";
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
      default:
        return set({ McxView: McxEmpresaView });
    }
  },
}));
