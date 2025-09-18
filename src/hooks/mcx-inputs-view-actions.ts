"use client";

import { useState } from "react";
import { useViewsStore, useEndViewStore } from "@/context/mcx";

import type { McxScreensType } from "@/types";

const useClearMcxInputs = (screen: McxScreensType) => {
  const { setMontante, setReferencia } = useEndViewStore();

  return () => (screen === 1 ? setReferencia("") : setMontante(""));
};

export const useReferenciaMontanteViewActions = () => {
  const { setView } = useViewsStore();
  const [screen, setScreen] = useState<McxScreensType>(1);

  const clearHandler = useClearMcxInputs(screen);
  const continueHandler = () => (screen === 1 ? setScreen(2) : setView("end"));

  return { screen, continueHandler, clearHandler };
};

export const useCarregamentoMontanteViewActions = () => {
  const { setView } = useViewsStore();
  const [screen, setScreen] = useState<McxScreensType>(1);

  const clearHandler = useClearMcxInputs(screen);

  return {
    screen,
    setScreen,
    setView,
    clearHandler,
  };
};
