"use client";

import { useEffect, useState } from "react";
import { useResetMcx } from "./reset-mcx";
import { useViewsStore, useEndViewStore, usePreViewStore } from "@/context/mcx";
import {
  setInputMontanteError,
  setInputReferenciaError,
  useInputRefsStore,
} from "@/context/mcx/input-errors";

import type { McxScreensType, McxInputActions } from "@/types";

const useReferenciaError = (length: number) => {
  const [error, setError] = useState(false);
  const { referencia } = useEndViewStore();

  useEffect(() => {
    if (referencia?.length !== length) {
      setError(true);
    } else {
      setError(false);
    }
  }, [referencia]);

  return error;
};

const useMontanteError = (mmin: number, mmax: number) => {
  const [error, setError] = useState(false);
  const { montante } = useEndViewStore();

  const montanteNum = Number(montante.slice(0, -2));

  useEffect(() => {
    if (montanteNum < mmin || montanteNum > mmax) {
      setError(true);
    } else {
      setError(false);
    }
  }, [montante]);

  return error;
};

const useClearMcxInputs = (screen: McxScreensType) => {
  const { setMontante, setReferencia } = useEndViewStore();

  return () => (screen === 1 ? setReferencia("") : setMontante(""));
};

export const useMcxInputActions: McxInputActions = (
  length: number,
  mmin: number,
  mmax: number,
  screens: number[]
) => {
  const { setView } = useViewsStore();
  const { setPreviewViews } = usePreViewStore();
  const { inputRefs } = useInputRefsStore();
  const refErr = useReferenciaError(length);
  const montErr = useMontanteError(mmin, mmax);
  const [screen, setScreen] = useState<McxScreensType>(
    screens[0] as McxScreensType
  );

  const validateRef = () => {
    setInputReferenciaError(refErr);

    if (refErr) {
      setTimeout(() => {
        inputRefs?.current[length - 1]?.focus();
      }, 0);
    } else {
      setScreen(2);
    }
  };

  const validateMont = () => {
    setInputMontanteError(montErr);

    if (montErr) {
      setTimeout(() => {
        inputRefs?.current[9]?.focus();
      }, 0);
    } else {
      setView("end");
      setPreviewViews("end");
    }
  };

  const continueHandler = () => {
    if (screens.length === 2) {
      switch (screen) {
        case 1: {
          validateRef();
          break;
        }
        case 2: {
          validateMont();
          break;
        }
      }
    } else {
      switch (screen) {
        case 1: {
          validateRef();
          break;
        }
        case 2: {
          setScreen(3);
          break;
        }
        case 3: {
          validateMont();
          break;
        }
      }
    }
  };

  const clearHandler = useClearMcxInputs(screen);

  return {
    screen,
    continueHandler,
    clearHandler,
  };
};

export const useMcxInputsView = (
  onContinue: () => void,
  onClear: () => void
) => {
  const reset = useResetMcx();

  useEffect(() => {
    const keyPressHandler = (e: globalThis.KeyboardEvent) => {
      const key = e.key;

      if (key === "z") {
        reset();
      }
      if (key === "x") {
        onClear();
      }
      if (key === "c") {
        onContinue();
      }
    };

    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [onContinue, onClear, reset]);

  return reset;
};
