import { useMcxDataStore } from "@/context/mcx";
import { createDataGridButtons } from "@/utils/create-grid-buttons";

import McxScreenText from "./McxScreenText";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

export default function McxEmpresaView() {
  const { servicos } = useMcxDataStore();

  const buttons = createDataGridButtons(servicos);

  return (
    <>
      <McxScreenText />
      {buttons.length === 0 && <NoMcxView text="Sem serviços disponíveis." />}
      {buttons && buttons.length > 0 && (
        <McxSelectionView buttons={buttons} target="servico" />
      )}
    </>
  );
}
