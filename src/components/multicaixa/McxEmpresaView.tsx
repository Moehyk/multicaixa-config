import { mcxEmpresaStore } from "@/context/mcx";
import { createDataGridButtons } from "@/utils/create-grid-buttons";

import McxScreenText from "./McxScreenText";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

export default function McxEmpresaView() {
  const { servicos } = mcxEmpresaStore();

  const buttons = createDataGridButtons(servicos);

  return (
    <>
      <McxScreenText subtext="Escolha um Serviço" />
      {buttons.length === 0 && <NoMcxView view="empresa" />}
      {buttons && buttons.length > 0 && (
        <McxSelectionView buttons={buttons} target="servico" />
      )}
    </>
  );
}
