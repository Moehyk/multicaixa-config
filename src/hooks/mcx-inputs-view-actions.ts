"use client";

import { useState } from "react";
import { useViewsStore, useEndViewStore } from "@/context/mcx";

export const useReferenciaMontanteViewActions = () => {
  const { setView } = useViewsStore();
  const { setMontante, setReferencia } = useEndViewStore();

  const [screen, setScreen] = useState<1 | 2>(1);

  const nextScreen = () => (screen === 1 ? setScreen(2) : setView("end"));
  const clearField = () => (screen === 1 ? setReferencia("") : setMontante(""));

  return { screen, nextScreen, clearField };
};
