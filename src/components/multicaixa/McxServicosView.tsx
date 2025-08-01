import { useServicoStore, useEmpresaStore, useViewStore } from "@/context/mcx";

import McxScreenText from "./McxScreenText";
import NoMcxView from "./NoMcxView";
import McxContentWrapper from "./McxContentWrapper";
import McxSelectionView from "./McxSelectionView";

import type { GridButton } from "@/types";

export default function McxServicosView() {
  const { id } = useViewStore();
  const { getServico } = useEmpresaStore();

  const servico = getServico(id);

  if (!servico) {
    return <NoMcxView text="Serviço não encontrado." />;
  }

  const buttons: GridButton[] = servico.produtos.map((p) => ({
    id: p.id,
    selectText: p.desigTeclaSeleccao,
    screenText: p.desigEcra,
  }));

  return (
    <>
      <McxScreenText subtext={servico?.desigEcra} />
      <McxContentWrapper>
        {buttons.length === 0 && <NoMcxView text="Sem produtos disponíveis." />}
        {buttons && buttons.length > 0 && (
          <McxSelectionView buttons={buttons} target="produto" isDefault />
        )}
      </McxContentWrapper>
    </>
  );
}
