import { sortDataArray } from "@/utils/sort-data-array";

import McxSelectionView from "./McxSelectionView";

import type { GridButton, CarregamentoPre } from "@/types";

export default function McxCarregamentoPre(props: CarregamentoPre) {
  const buttons: GridButton[] = sortDataArray(props.montantes).map<GridButton>(
    (m) => ({
      id: m.id,
      produtoTipo: "carregamentos",
      selectText: `${m.montante.toString()} KZS`,
      selectSecondarytext: `${m.descricao}`,
    })
  );

  return <McxSelectionView buttons={buttons} target="end" />;
}
