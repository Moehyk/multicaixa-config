import { sortDataArray } from "./arrays";
import { amountFormatter } from "./amount-formatter";

import type { GridButton, Montante, ServicoData, ProdutoData } from "@/types";

function isMontanteComDescricao(
  montante: Montante<"descricao"> | Montante<"quantidade">
): montante is Montante<"descricao"> {
  return "descricao" in montante;
}

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
    const montanteText =
      montante.montante > 0
        ? amountFormatter(montante.montante)
        : "[Montante] KZS";

    if (isMontanteComDescricao(montante)) {
      return {
        id: montante.id,
        selectText:
          montante.descricao !== "" ? montante.descricao : "[Descrição]",
        selectSecondarytext: montanteText,
        value: `${montante.montante}00`,
      };
    } else {
      let quantidade = "[Qtde]";
      let unidade = "[Unidade]";

      if (montante.quantidade > 0) {
        quantidade = montante.quantidade.toString();
      }

      if (designacao !== "") {
        unidade = designacao;
      }

      const selectText = `${quantidade} ${unidade}`;

      return {
        id: montante.id,
        selectText,
        selectSecondarytext: montanteText,
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
