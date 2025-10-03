import { sortDataArray } from "./arrays";
import { amountFormatter } from "./amount-formatter";

import type { GridButton, Montante, ServicoData, ProdutoData } from "@/types";

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
        selectText: montante.descricao,
        selectSecondarytext: amountFormatter(montante.montante),
        value: `${montante.montante}00`,
      };
    } else {
      // TypeScript now knows this is Montante<"quantidade">
      return {
        id: montante.id,
        selectText: `${new Intl.NumberFormat("pt-BR").format(
          montante.quantidade
        )} ${designacao}`,
        selectSecondarytext: amountFormatter(montante.montante),
        value: `${montante.montante}00`,
      };
    }
  });
}

export const createDataGridButtons = (
  data: ServicoData[] | ProdutoData[]
): GridButton[] =>
  data.map<GridButton>((d) => ({
    id: d.id,
    selectText: d.desigTeclaSeleccao,
    screenText: d.desigEcra,
  }));
