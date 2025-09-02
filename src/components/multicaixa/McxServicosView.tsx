import { useMcxDataStore, useViewsStore } from "@/context/mcx";
import { createDataGridButtons } from "@/utils/create-grid-buttons";

import McxScreenText from "./McxScreenText";
import NoMcxView from "./NoMcxView";
import McxSelectionView from "./McxSelectionView";

export default function McxServicosView() {
  const { id } = useViewsStore();
  const { getServico } = useMcxDataStore();

  const servico = getServico(id);

  if (!servico) return <NoMcxView text="Serviço não encontrado." />;

  const buttons = createDataGridButtons(servico.produtos);

  return (
    <>
      <McxScreenText subtext={servico.desigEcra} />
      {buttons.length === 0 && <NoMcxView text="Sem produtos disponíveis." />}
      {buttons && buttons.length > 0 && (
        <McxSelectionView buttons={buttons} target="produto" />
      )}
    </>
  );
}
