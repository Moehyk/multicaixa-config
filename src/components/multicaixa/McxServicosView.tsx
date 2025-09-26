import { useMcxData } from "@/hooks/useMcxData";
import { createDataGridButtons } from "@/utils/create-grid-buttons";

import McxScreenText from "./McxScreenText";
import NoMcxView from "./NoMcxView";
import McxSelectionView from "./McxSelectionView";

export default function McxServicosView() {
  const { servico } = useMcxData();

  if (!servico) {
    return (
      <>
        <McxScreenText subtext="Serviço não encontrado." />
        <NoMcxView view="end" />;
      </>
    );
  }

  const buttons = createDataGridButtons(servico.produtos);

  return (
    <>
      <McxScreenText subtext={servico.desigEcra} />
      {buttons.length === 0 && <NoMcxView view="servico" />}
      {buttons && buttons.length > 0 && (
        <McxSelectionView buttons={buttons} target="produto" />
      )}
    </>
  );
}
