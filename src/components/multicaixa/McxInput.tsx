"use client";

import { useEndViewStore } from "@/context/mcx";
import {
  renderMontanteText,
  renderReferenciaText,
} from "@/utils/mcxinputs-helpers";

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
  const { setReferencia, referencia } = useEndViewStore();

  return (
    <>
      <McxInputsView.Title title={renderReferenciaText(desigReferencia)} />
      <McxInputsView.Inputs
        onChange={setReferencia}
        value={referencia ?? ""}
        valueLength={tamanhoReferencia}
        valueType="REFERENCIA"
      />
      <McxInputsView.Text text={textoEcraReferencia} />
    </>
  );
}

function MontanteInput({ min, max }: MontanteInputProps) {
  const { montante, setMontante } = useEndViewStore();

  return (
    <>
      <McxInputsView.Title title="Indique o Montante Pretendido" />
      <McxInputsView.Inputs
        onChange={setMontante}
        value={montante ?? ""}
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
