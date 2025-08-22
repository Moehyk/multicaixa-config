import { sortDataArray } from "@/utils/sort-data-array";

import McxReferenciaMontanteView from "./McxReferenciaMontanteView";
import McxSelectionView from "./McxSelectionView";
import McxCarregamentoPre from "./McxCarregamentoPre";

import type { CarregamentoData, RenderCarregamento, GridButton } from "@/types";

const renderCarregamento = (c: RenderCarregamento) => {
  switch (c.montanteTipo) {
    case "montante_pre_definido": {
      return <McxCarregamentoPre montantes={c.montantes} />;
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
      const buttons: GridButton[] = sortDataArray(c.montantes).map<GridButton>(
        (m) => ({
          id: m.id,
          produtoTipo: "carregamentos",
          selectText: `${m.montante.toString()} KZS`,
          selectSecondarytext: `${m.descricao}`,
        })
      );
      return <McxSelectionView buttons={buttons} target="end" />;
    }
    default:
      const _exhaustiveCheck: never = c;
      return null;
  }
};

export default function McxCarregamentos(props: NonNullable<CarregamentoData>) {
  return <>{renderCarregamento(props as RenderCarregamento)}</>;
}
