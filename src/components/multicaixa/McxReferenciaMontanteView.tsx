"use client";

import { useState } from "react";

import McxInputWrapper from "./McxInputWrapper";
import McxInput from "./McxInput";

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
    <McxInputWrapper
      onCancel={() => setScreen(1)}
      onContinue={() => setScreen(2)}
    >
      <McxInput>
        {screen === 1 && (
          <>
            <McxInput.Title title={desigReferencia} />
            <McxInput.Input
              value={referenciaValue}
              valueLength={tamanhoReferencia}
              valueType="REFERENCIA"
              onChange={setReferenciaValue}
            />
          </>
        )}
        {screen === 2 && (
          <>
            <McxInput.Title title="Introduza o Montante Pretendido" />
            <McxInput.Input
              value={montanteValue}
              valueLength={10}
              valueType="MONTANTE"
              onChange={setMontanteValue}
            />
          </>
        )}
        <McxInput.Text text={textoEcraReferencia} />
      </McxInput>
    </McxInputWrapper>
  );
}
