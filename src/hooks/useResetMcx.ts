import { useViewsStore, useEndViewStore } from "@/context/mcx";

export const useResetMcx = () => {
  const { setView } = useViewsStore();
  const { resetEndStore } = useEndViewStore();

  return () => {
    resetEndStore();
    setView("empresa");
  };
};
