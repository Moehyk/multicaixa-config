import { create } from "zustand";

import {
  McxEmpresaView,
  McxServicosView,
  McxProdutoView,
} from "@/components/multicaixa";

import type { JSXElementConstructor } from "react";
import type { Views } from "@/types";

type ViewStore = {
  id?: string;
  McxView: JSXElementConstructor<any>;
  setView: (view: Views, id?: string) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
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
