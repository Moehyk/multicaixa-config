"use client";

import { useState } from "react";
import { createGridButtons } from "@/utils/create-grid-buttons";

import McxInputsView from "./McxInputsView";
import McxSelectionView from "./McxSelectionView";
import McxInput from "./McxInput";
import McxReferenciaMontanteView from "./McxReferenciaMontanteView";

import type { CarregamentoData, McxScreensType, GridButton } from "@/types";

function CarregamentoMontantes({
  montanteTipo,
  montantes,
  ...props
}: NonNullable<CarregamentoData>) {
  const [screen, setScreen] = useState<McxScreensType>(1);

  const buttons: GridButton[] = createGridButtons(montantes);

  const nextScreen = (screen: McxScreensType): McxScreensType => {
    if (screen < 3) {
      return (screen + 1) as McxScreensType;
    } else {
      return 3;
    }
  };

  return (
    <>
      {screen === 1 && (
        <McxInputsView
          onCancel={() => setScreen(1)}
          onContinue={() => setScreen(nextScreen)}
        >
          <McxInput
            valueType="REFERENCIA"
            tamanhoReferencia={props.tamanhoReferencia}
            desigReferencia={props.desigReferencia}
            textoEcraReferencia={props.textoEcraReferencia}
          />
        </McxInputsView>
      )}
      {screen === 2 && (
        <McxSelectionView
          buttons={buttons}
          target="end"
          isDefault
          hasFreeAmount={montanteTipo === "ambos"}
          toFreeAmount={() => setScreen(3)}
        />
      )}
      {screen === 3 && (
        <McxInputsView
          onCancel={() => setScreen(1)}
          onContinue={() => setScreen(nextScreen)}
        >
          <McxInput
            valueType="MONTANTE"
            min={props.montanteMin!}
            max={props.montanteMax!}
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
