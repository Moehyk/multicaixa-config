"use client";

import { useState } from "react";
import { useViewsStore } from "@/context/mcx";

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
  const { setView } = useViewsStore();
  const [screen, setScreen] = useState<1 | 2>(1);

  return (
    <McxInputsView
      onCancel={() => setScreen(1)}
      onContinue={() => (screen === 1 ? setScreen(2) : setView("end"))}
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
