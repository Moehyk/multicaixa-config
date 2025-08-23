import { sortDataArray } from "@/utils/sort-data-array";

import McxSelectionView from "./McxSelectionView";
import McxCarregamentoPre from "./McxCarregamentoPre";
import McxCarregamentoFree from "./McxCarregamentoFree";
import McxCarregamentoBoth from "./McxCarregamentoBoth";

import type { CarregamentoData, RenderCarregamento, GridButton } from "@/types";

const renderCarregamento = (c: RenderCarregamento) => {
  switch (c.montanteTipo) {
    case "montante_pre_definido": {
      return <McxCarregamentoPre {...c} />;
    }
    case "montante_livre": {
      return <McxCarregamentoFree {...c} />;
    }
    case "ambos": {
      return <McxCarregamentoBoth {...c} />;
    }
    default:
      const _exhaustiveCheck: never = c;
      return null;
  }
};

export default function McxCarregamentos(props: NonNullable<CarregamentoData>) {
  return <>{renderCarregamento(props as RenderCarregamento)}</>;
}
