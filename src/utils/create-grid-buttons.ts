import { sortDataArray } from "./sort-data-array";

import type { GridButton, Montante } from "@/types";

// Guard function to check if a Montante is a Montante<"descricao">
function isMontanteComDescricao(
  montante: Montante<"descricao"> | Montante<"quantidade">
): montante is Montante<"descricao"> {
  return "descricao" in montante;
}

// Overload functions to allow for different types of montantes
export function createGridButtons(
  montantes: Montante<"descricao">[],
  designacao?: string
): GridButton[];

export function createGridButtons(
  montantes: Montante<"quantidade">[],
  designacao: string
): GridButton[];

export function createGridButtons(
  montantes: (Montante<"descricao"> | Montante<"quantidade">)[],
  designacao: string = ""
): GridButton[] {
  const sortedMontantes = sortDataArray(montantes);

  return sortedMontantes.map((montante) => {
    if (isMontanteComDescricao(montante)) {
      // TypeScript now knows this is Montante<"descricao">
      return {
        id: montante.id,
        selectText: `${montante.montante.toString()} KZS`,
        selectSecondarytext: montante.descricao,
      };
    } else {
      // TypeScript now knows this is Montante<"quantidade">
      return {
        id: montante.id,
        selectText: `${montante.quantidade.toString()} ${designacao}`,
        selectSecondarytext: `${montante.montante.toString()} Kzs`,
      };
    }
  });
}
