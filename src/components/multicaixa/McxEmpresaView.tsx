import { useMcxData } from "@/hooks/mcx-data";
import { createDataGridButtons } from "@/utils/create-grid-buttons";

import McxScreenText from "./McxScreenText";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

export default function McxEmpresaView() {
  const { servicos } = useMcxData();

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
