import React from "react";

import type { CarregamentoData } from "@/types";
import type { MontanteTipo } from "@prisma/client";

const renderCarregamento = (montanteTipo: MontanteTipo) => {
  switch (montanteTipo) {
    case "montante_pre_definido": {
      return <div>Carregamento Multi</div>;
    }
    case "montante_livre": {
      return <div>Carregamento Livre</div>;
    }
    case "ambos": {
      return <div>Carregamento Ambos</div>;
    }
    default:
      const _exhaustiveCheck: never = montanteTipo;
      return null;
  }
};

export default function McxCarregamentos({
  desigReferencia,
  montanteTipo,
}: NonNullable<CarregamentoData>) {
  return <div>{renderCarregamento(montanteTipo)}</div>;
}
