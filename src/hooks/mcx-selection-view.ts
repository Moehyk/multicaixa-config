import { useEffect, useCallback, useState } from "react";
import { useEndViewStore, useViewsStore } from "@/context/mcx";
import { splitArray } from "@/utils/split-array";

import type { GroupButtonsProps, GridButton } from "@/types";

export const useMcxSelectionButtons = (buttons: GridButton[]) => {
  const splitButtons = splitArray(buttons, 7, 6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtns, setPageBtns] = useState<GridButton[]>(
    splitButtons[currentPage - 1]
  );

  useEffect(() => {
    setPageBtns(splitButtons[currentPage - 1]);
  }, [currentPage]);

  return { currentPage, setCurrentPage, pageBtns, setPageBtns, splitButtons };
};

export const useMcxNavigation = ({
  buttons,
  isFreeAmount,
  target,
  toFreeAmount,
}: GroupButtonsProps) => {
  const { setView } = useViewsStore();
  const { setUnidades, setMontante } = useEndViewStore();

  const toNextView = (id?: string) => {
    setView(target, id);
  };

  const setRecargasValues = (
    unidades: string | undefined,
    montante: string
  ) => {
    setUnidades(unidades);
    setMontante(montante);
  };

  const navigate = useCallback(
    (selectText: string, value?: string, id?: string) => {
      setRecargasValues(selectText, value ?? "");
      toNextView(id);
    },
    [target, setRecargasValues, toNextView]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      const keyNumber = parseInt(event.key);
      if (keyNumber >= 1 && keyNumber <= 8) {
        const buttonIndex = keyNumber - 1;

        if (buttonIndex < buttons.length) {
          const btn = buttons[buttonIndex];
          navigate(btn.selectText, btn.value, btn.id);
        } else if (isFreeAmount && buttonIndex === buttons.length) {
          toFreeAmount();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [buttons, isFreeAmount, navigate, toFreeAmount]);

  return navigate;
};
