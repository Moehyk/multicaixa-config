import { modals } from "@mantine/modals";
import { useViewsStore, useEndViewStore } from "@/context/mcx";
import {
  setInputMontanteError,
  setInputReferenciaError,
} from "@/context/mcx/input-errors";

export const useResetMcx = () => {
  const { setView } = useViewsStore();
  const { resetEndStore } = useEndViewStore();

  return () => {
    setInputMontanteError(false);
    setInputReferenciaError(false);
    resetEndStore();
    setView("empresa");
  };
};

export const useCloseMcxModal = () => {
  const reset = useResetMcx();

  return () => {
    reset();
    modals.closeAll();
  };
};
