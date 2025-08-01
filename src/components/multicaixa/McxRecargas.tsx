import McxContentWrapper from "./McxContentWrapper";
import McxSelectionView from "./McxSelectionView";

import type { GridButton, Montante } from "@/types";

export default function McxRecargas({
  designacao,
  montantes,
}: {
  montantes: Montante<"quantidade">[];
  designacao: string;
}) {
  const buttons: GridButton[] = montantes.map<GridButton>((montante) => ({
    id: montante.id,
    produtoTipo: "recargas",
    selectText: `${montante.quantidade.toString()} ${designacao}`,
    selectSecondarytext: `${montante.montante.toString()} Kzs`,
  }));

  return (
    <McxContentWrapper>
      <McxSelectionView buttons={buttons} target="end" isDefault />
    </McxContentWrapper>
  );
}
