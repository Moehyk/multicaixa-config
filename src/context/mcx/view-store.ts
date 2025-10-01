import { create } from "zustand";

import {
  McxEmpresaView,
  McxServicosView,
  McxProdutoView,
  McxEndView,
  McxPreviewServicoView,
  McxPreviewProdutoView,
} from "@/components/multicaixa";

import type { Views, ViewsStore, PreviewViewsStore } from "@/types";

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

export const usePreViewStore = create<PreviewViewsStore>((set) => ({
  McxPreviewView: McxPreviewServicoView,
  setPreviewViews: (type) => {
    switch (type) {
      case "servico": {
        return set({ McxPreviewView: McxPreviewServicoView });
      }
      case "produto": {
        return set({ McxPreviewView: McxPreviewProdutoView });
      }

      case "end": {
        return set({ McxPreviewView: McxEndView });
      }

      default: {
        return set({ McxPreviewView: McxPreviewServicoView });
      }
    }
  },
}));
