import { modals } from "@mantine/modals";
import { useViewsStore, useEndViewStore } from "@/context/mcx";

export const useResetMcx = () => {
  const { setView } = useViewsStore();
  const { resetEndStore } = useEndViewStore();

  return () => {
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
