import { createGridButtons } from "@/utils/create-grid-buttons";

import McxSelectionView from "./McxSelectionView";

import type { GridButton, Montante } from "@/types";

export default function McxRecargas({
  designacao,
  montantes,
}: {
  montantes: Montante<"quantidade">[];
  designacao: string;
}) {
  const buttons: GridButton[] = createGridButtons(montantes, designacao);

  return <McxSelectionView buttons={buttons} target="end" />;
}
