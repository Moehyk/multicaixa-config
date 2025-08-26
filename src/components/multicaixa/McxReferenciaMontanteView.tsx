"use client";

import { useState } from "react";

import McxInputsView from "./McxInputsView";
import McxInput from "./McxInput";

import type { PagamentoData, Referencia } from "@/types";

export default function McxReferenciaMontanteView({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
  montanteMin,
  montanteMax,
}: Referencia) {
  const [screen, setScreen] = useState<1 | 2>(1);

  return (
    <McxInputsView
      onCancel={() => setScreen(1)}
      onContinue={() => setScreen(2)}
    >
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
