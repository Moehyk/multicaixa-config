"use client";

import { useState } from "react";
import { useViewsStore, useEndViewStore } from "@/context/mcx";

import type { CarregamentoData, McxScreensType, GridButton } from "@/types";

export const useReferenciaMontanteViewActions = () => {
  const { setView } = useViewsStore();
  const { setMontante, setReferencia } = useEndViewStore();

  const [screen, setScreen] = useState<1 | 2>(1);

  const continueHandler = () => (screen === 1 ? setScreen(2) : setView("end"));
  const clearHandler = () =>
    screen === 1 ? setReferencia("") : setMontante("");

  return { screen, continueHandler, clearHandler };
};
