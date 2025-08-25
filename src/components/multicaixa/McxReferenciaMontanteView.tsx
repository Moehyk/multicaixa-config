"use client";

import { useState } from "react";

import McxInputsView from "./McxInputsView";

import type { PagamentoData } from "@/types";

export default function McxReferenciaMontanteView({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
}: NonNullable<PagamentoData>) {
  const [screen, setScreen] = useState<1 | 2>(1);
  const [referenciaValue, setReferenciaValue] = useState("");
  const [montanteValue, setMontanteValue] = useState("");

  return (
    <McxInputsView
      onCancel={() => setScreen(1)}
      onContinue={() => setScreen(2)}
    >
      <McxInputsView.Title title={desigReferencia} />
      {screen === 1 && (
        <McxInputsView.Inputs
          value={referenciaValue}
          valueLength={tamanhoReferencia}
          valueType="REFERENCIA"
          onChange={setReferenciaValue}
        />
      )}
      {screen === 2 && (
        <McxInputsView.Inputs
          value={montanteValue}
          valueLength={10}
          valueType="MONTANTE"
          onChange={setMontanteValue}
        />
      )}
      <McxInputsView.Text text={textoEcraReferencia} />
    </McxInputsView>
  );
}
