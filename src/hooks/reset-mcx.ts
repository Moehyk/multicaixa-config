import { modals } from "@mantine/modals";
import { useViewsStore, useEndViewStore, usePreViewStore } from "@/context/mcx";
import {
  setInputMontanteError,
  setInputReferenciaError,
} from "@/context/mcx/input-errors";

export const useResetMcx = () => {
  const { setView } = useViewsStore();
  const { setPreviewViews } = usePreViewStore();
  const { resetEndStore } = useEndViewStore();

  return () => {
    setInputMontanteError(false);
    setInputReferenciaError(false);
    resetEndStore();
    setView("empresa");
    setPreviewViews("servico");
  };
};

export const useCloseMcxModal = () => {
  const reset = useResetMcx();

  return () => {
    reset();
    modals.closeAll();
  };
};
