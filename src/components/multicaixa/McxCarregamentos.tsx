import React from "react";

import McxReferenciaMontanteView from "./McxReferenciaMontanteView";

import type { CarregamentoData, RenderCarregamento } from "@/types";
import type { MontanteTipo } from "@prisma/client";
import { m } from "motion/react";

const renderCarregamento = (c: RenderCarregamento) => {
  switch (c.montanteTipo) {
    case "montante_pre_definido": {
      return <div>Carregamento Multi</div>;
    }
    case "montante_livre": {
      return (
        <McxReferenciaMontanteView
          desigReferencia={c.desigReferencia}
          tamanhoReferencia={c.tamanhoReferencia}
          textoEcraReferencia={c.textoEcraReferencia}
          montanteMax={c.montanteMax}
          montanteMin={c.montanteMin}
          id={c.id}
        />
      );
    }
    case "ambos": {
      return <div>Carregamento Ambos</div>;
    }
    default:
      const _exhaustiveCheck: never = c;
      return null;
  }
};

export default function McxCarregamentos(props: NonNullable<CarregamentoData>) {
  return <>{renderCarregamento(props as RenderCarregamento)}</>;
}
