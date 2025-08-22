import { sortDataArray } from "@/utils/sort-data-array";

import McxSelectionView from "./McxSelectionView";

import type { GridButton, Montante } from "@/types";

export default function McxCarregamentoPre({
  montantes,
}: {
  montantes: Montante<"descricao">[];
}) {
  const buttons: GridButton[] = sortDataArray(montantes).map<GridButton>(
    (m) => ({
      id: m.id,
      produtoTipo: "carregamentos",
      selectText: `${m.montante.toString()} KZS`,
      selectSecondarytext: `${m.descricao}`,
    })
  );

  return <McxSelectionView buttons={buttons} target="end" />;
}
