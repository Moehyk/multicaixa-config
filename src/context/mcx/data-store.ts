import { create } from "zustand";

import type { EmpresaMcxStore } from "@/types";

export const empresaStore = create<EmpresaMcxStore>((set) => ({
  desigEcra: "",
  servicos: [],
}));
