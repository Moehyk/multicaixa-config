"use client";

import { useMcxInputActions } from "@/hooks/mcx-inputs-view-actions";
import { createGridButtons } from "@/utils/create-grid-buttons";

import McxInputsView from "./McxInputsView";
import McxSelectionView from "./McxSelectionView";
import McxInput from "./McxInput";
import McxReferenciaMontanteView from "./McxReferenciaMontanteView";

import type { CarregamentoData, GridButton } from "@/types";

function CarregamentoMontantes({
  montanteTipo,
  montantes,
  tamanhoReferencia,
  montanteMax,
  montanteMin,
  ...props
}: NonNullable<CarregamentoData>) {
  const { screen, setScreen, continueHandler, clearHandler } =
    useMcxInputActions(tamanhoReferencia, montanteMin ?? 0, montanteMax ?? 0);

  const buttons: GridButton[] = createGridButtons(montantes);

  return (
    <>
      {screen === 1 && (
        <McxInputsView onClear={clearHandler} onContinue={continueHandler}>
          <McxInput
            valueType="REFERENCIA"
            tamanhoReferencia={tamanhoReferencia}
            desigReferencia={props.desigReferencia}
            textoEcraReferencia={props.textoEcraReferencia}
          />
        </McxInputsView>
      )}
      {screen === 2 && (
        <McxSelectionView
          buttons={buttons}
          target="end"
          hasFreeAmount={montanteTipo === "ambos"}
          toFreeAmount={() => setScreen(3)}
        />
      )}
      {screen === 3 && (
        <McxInputsView onClear={clearHandler} onContinue={continueHandler}>
          <McxInput
            valueType="MONTANTE"
            min={montanteMin ?? 0}
            max={montanteMax ?? 0}
          />
        </McxInputsView>
      )}
    </>
  );
}

export default function McxCarregamentos({
  montanteTipo,
  montantes,
  ...props
}: NonNullable<CarregamentoData>) {
  if (montanteTipo === "montante_livre") {
    return <McxReferenciaMontanteView {...props} />;
  } else {
    return (
      <CarregamentoMontantes
        {...props}
        montantes={montantes}
        montanteTipo={montanteTipo}
      />
    );
  }
}
