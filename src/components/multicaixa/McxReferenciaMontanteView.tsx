"use client";

import { useReferenciaMontanteViewActions } from "@/hooks/mcx-inputs-view-actions";

import McxInputsView from "./McxInputsView";
import McxInput from "./McxInput";

import type { Referencia } from "@/types";

export default function McxReferenciaMontanteView({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
  montanteMin,
  montanteMax,
}: Referencia) {
  const { screen, clearHandler, continueHandler } =
    useReferenciaMontanteViewActions();

  return (
    <McxInputsView onClear={clearHandler} onContinue={continueHandler}>
      {screen === 1 && (
        <McxInput
          valueType="REFERENCIA"
          tamanhoReferencia={tamanhoReferencia}
          desigReferencia={desigReferencia}
          textoEcraReferencia={textoEcraReferencia}
        />
      )}
      {screen === 2 && (
        <McxInput valueType="MONTANTE" min={montanteMin!} max={montanteMax!} />
      )}
    </McxInputsView>
  );
}
