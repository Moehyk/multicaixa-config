import { useMcxData } from "./useMcxData";
import { useResetMcx, useCloseMcxModal } from "./reset-mcx";
import { useEndViewStore } from "@/context/mcx";

export const useMcxEndView = () => {
  const { produto } = useMcxData();
  const { montante, referencia, unidades } = useEndViewStore();
  const reset = useResetMcx();
  const closeModal = useCloseMcxModal();

  return {
    produto,
    montante,
    referencia,
    unidades,
    closeModal,
    reset,
  };
};
