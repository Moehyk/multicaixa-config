import { useCloseMcxModal, useResetMcx } from "./reset-mcx";

import type { Views } from "@/types";

export const useNoMcxView = (view: Views) => {
  const reset = useResetMcx();
  const closeModal = useCloseMcxModal();

  const noViewsConfig = {
    empresa: ["Sem serviços disponíveis.", closeModal] as const,
    servico: ["Sem produtos disponíveis.", reset] as const,
    produto: ["Produto não encontrado.", reset] as const,
    end: ["Não é possível apresentar dados.", reset] as const,
  };

  return noViewsConfig[view];
};
