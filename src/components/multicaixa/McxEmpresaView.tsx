import { useMcxDataStore } from "@/context/mcx";

import McxScreenText from "./McxScreenText";
import McxContentWrapper from "./McxContentWrapper";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

import type { GridButton } from "@/types";

export default function McxEmpresaView() {
  const { servicos } = useMcxDataStore();

  const buttons: GridButton[] = servicos.map((servico) => ({
    id: servico.id,
    selectText: servico.desigTeclaSeleccao,
    screenText: servico.desigEcra,
  }));

  return (
    <>
      <McxScreenText />
      <McxContentWrapper>
        {buttons.length === 0 && <NoMcxView text="Sem serviços disponíveis." />}
        {buttons && buttons.length > 0 && (
          <McxSelectionView buttons={buttons} target="servico" isDefault />
        )}
      </McxContentWrapper>
    </>
  );
}
