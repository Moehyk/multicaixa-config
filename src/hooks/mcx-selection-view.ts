import { useEffect, useCallback, useState, useMemo } from "react";
import { useEndViewStore, useViewsStore, usePreViewStore } from "@/context/mcx";
import { splitArray } from "@/utils/arrays";

import type { McxSelectionViewProps, GridButton } from "@/types";

export const useMcxSelectionButtons = ({
  buttons,
  target,
  toFreeAmount,
}: McxSelectionViewProps) => {
  ///////////////////////////////////////////////////
  // MANAGING THE BUTTONS GROUPS AND BUTTONS STATE
  ///////////////////////////////////////////////////
  const [currentGroup, setCurrentGroup] = useState(1);
  const buttonsGroups = splitArray(buttons, 7, 6);
  const currentButtons = buttonsGroups[currentGroup - 1];

  const hasPreviousPageBtn = currentGroup > 1;
  const hasNextPageBtn = currentGroup < buttonsGroups.length;

  ///////////////////////////////////////////////////
  // MANAGING VIEW NAVIGATION AND DATA STORING
  ///////////////////////////////////////////////////
  const freeAmountHandler = toFreeAmount ?? (() => {});
  const { setView } = useViewsStore();
  const { setPreviewViews } = usePreViewStore();
  const { setUnidades, setMontante } = useEndViewStore();

  const toNextView = (id?: string) => {
    setView(target, id);
    setPreviewViews("end");
  };

  const setRecargasValues = (
    unidades: string | undefined,
    montante: string
  ) => {
    setUnidades(unidades);
    setMontante(montante);
  };

  const navigate = useCallback(
    ({ selectText, value, id, isFreeAmount }: GridButton) => {
      if (isFreeAmount) {
        freeAmountHandler();
        return;
      }

      setRecargasValues(selectText, value ?? "");
      toNextView(id);
    },
    [target, setRecargasValues, toNextView]
  );

  ///////////////////////////////////////////////////
  // HANDLE KEYBOARD NAVIGATION
  ///////////////////////////////////////////////////
  useEffect(() => {
    const keyPressHandler = (e: globalThis.KeyboardEvent) => {
      const keyNumber = parseInt(e.key);

      if (keyNumber >= 1 && keyNumber <= 8) {
        if (keyNumber === 1) {
          if (hasPreviousPageBtn) {
            setCurrentGroup((prev) => prev - 1);
          } else if (currentButtons.length >= 1) {
            const btn = currentButtons[0];
            navigate(btn);
          }
        } else if (keyNumber === 8) {
          if (hasNextPageBtn) {
            setCurrentGroup((prev) => prev + 1);
          } else if (currentButtons.length >= 8) {
            const btnIndex = 8 - (hasPreviousPageBtn ? 2 : 1);
            const btn = currentButtons[btnIndex];
            navigate(btn);
          }
        } else {
          let buttonIndex = keyNumber - 1;
          if (hasPreviousPageBtn) buttonIndex -= 1;

          if (buttonIndex >= 0 && buttonIndex < currentButtons.length) {
            const btn = currentButtons[buttonIndex];
            navigate(btn);
          }
        }
      }
    };

    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [
    currentButtons,
    hasPreviousPageBtn,
    hasNextPageBtn,
    navigate,
    setCurrentGroup,
  ]);

  return {
    setCurrentGroup,
    currentButtons,
    hasPreviousPageBtn,
    hasNextPageBtn,
    navigate,
  };
};
