"use client";

import { useState } from "react";
import { renderMontanteText } from "@/utils";

import McxInputsView from "./McxInputsView";

import type {
  McxInputProps,
  ReferenciaInputProps,
  MontanteInputProps,
} from "@/types";

function ReferenciaInput({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
}: ReferenciaInputProps) {
  const [referenciaValue, setReferenciaValue] = useState("");
  console.log("referencia", referenciaValue);
  return (
    <>
      <McxInputsView.Title title={desigReferencia} />
      <McxInputsView.Inputs
        onChange={setReferenciaValue}
        value={referenciaValue}
        valueLength={tamanhoReferencia}
        valueType="REFERENCIA"
      />
      <McxInputsView.Text text={textoEcraReferencia} />
    </>
  );
}

function MontanteInput({ min, max }: MontanteInputProps) {
  const [montanteValue, setMontanteValue] = useState("");
  console.log("montante", montanteValue);
  return (
    <>
      <McxInputsView.Title title="Indique o Montante Pretendido" />
      <McxInputsView.Inputs
        onChange={setMontanteValue}
        value={montanteValue}
        valueLength={10}
        valueType="MONTANTE"
      />
      <McxInputsView.Text text={renderMontanteText(min, max)} />
    </>
  );
}

const renderInput = (props: McxInputProps) => {
  switch (props.valueType) {
    case "MONTANTE":
      return <MontanteInput {...props} />;
    case "REFERENCIA":
      return <ReferenciaInput {...props} />;
    default:
      const _exhaustiveCheck: never = props;
      return null;
  }
};

export default function McxInput(props: McxInputProps) {
  return <>{renderInput(props)}</>;
}
