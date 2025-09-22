"use client";

import { useState, useEffect } from "react";
import { useViewsStore, useEndViewStore } from "@/context/mcx";
import {
  setInputMontanteError,
  setInputReferenciaError,
  useInputRefsStore,
} from "@/context/mcx/input-errors";

import type { McxScreensType, McxInputActions } from "@/types";

const useReferenciaError = (length: number) => {
  const [error, setError] = useState<boolean>(false);
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
  const [error, setError] = useState<boolean>(false);
  const { montante } = useEndViewStore();

  const monatanteNum = Number(montante.slice(0, -2));

  useEffect(() => {
    if (monatanteNum < mmin || monatanteNum > mmax) {
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

const useContinueWithValidation = (refErr: boolean, montErr: boolean) => {
  const { setView } = useViewsStore();
  const { inputRefs } = useInputRefsStore();
  const [screen, setScreen] = useState<McxScreensType>(1);

  const onContinue = () => {
    if (screen === 1) {
      if (refErr) {
        setInputReferenciaError(true);
        setTimeout(() => {
          inputRefs?.current[length - 1]?.focus();
        }, 0);
        return;
      } else {
        setInputReferenciaError(false);
      }
      setScreen(2);
    } else {
      if (montErr) {
        setInputMontanteError(true);
        setTimeout(() => {
          inputRefs?.current[9]?.focus();
        }, 0);
        return;
      } else {
        setInputMontanteError(false);
      }
      setView("end");
    }
  };

  return [[screen, setScreen], onContinue] as const;
};

export const useMcxInputActions: McxInputActions = (l, min, max) => {
  const referenciaError = useReferenciaError(l);
  const montanteError = useMontanteError(min, max);

  const [[screen, setScreen], continueHandler] = useContinueWithValidation(
    referenciaError,
    montanteError
  );

  const clearHandler = useClearMcxInputs(screen);

  return {
    screen,
    continueHandler,
    clearHandler,
    setScreen,
  };
};
