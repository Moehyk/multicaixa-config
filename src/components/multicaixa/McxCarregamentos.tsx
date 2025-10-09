"use client";

import { useMcxInputActions } from "@/hooks/mcx-inputs-view";
import { createGridButtons, generateMcxScreens } from "@/utils";

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
  desigReferencia,
  textoEcraReferencia,
}: NonNullable<CarregamentoData>) {
  const { screen, continueHandler, clearHandler } = useMcxInputActions(
    tamanhoReferencia,
    montanteMin ?? 0,
    montanteMax ?? 0,
    generateMcxScreens(3)
  );

  const buttons: GridButton[] = createGridButtons(montantes);

  return (
    <>
      {screen === 1 && (
        <McxInputsView onClear={clearHandler} onContinue={continueHandler}>
          <McxInput
            valueType="REFERENCIA"
            tamanhoReferencia={tamanhoReferencia}
            desigReferencia={desigReferencia}
            textoEcraReferencia={textoEcraReferencia}
          />
        </McxInputsView>
      )}
      {screen === 2 && (
        <McxSelectionView
          buttons={buttons}
          target="end"
          hasFreeAmount={montanteTipo === "ambos"}
          toFreeAmount={continueHandler}
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
