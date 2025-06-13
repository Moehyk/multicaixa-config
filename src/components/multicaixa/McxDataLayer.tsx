import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

import type { GridButton, Views, Entidade, ServicoWithProdutos } from "@/types";
import type { Servico } from "@prisma/client";

const createProdutosButtons = (
  arr: ServicoWithProdutos[],
  servicoId: string
) => {
  const servicoData = arr.find((servico) => servico.id === servicoId);

  const gridButtons: GridButton[] = [];

  if (servicoData) {
    gridButtons.push(
      ...servicoData.produtos.map((produto) => ({
        id: produto.id,
        selectText: produto.desig_tecla_seleccao,
        screenText: produto.desig_ecra,
        produtoTipo: produto.type,
        subtitle: "Escolha um produto",
      }))
    );
  }

  return gridButtons;
};

const createServicosButtons = (initArray: Servico[]) => {
  const gridButtons: GridButton[] = initArray.map((button) => ({
    id: button.id,
    selectText: button.desig_tecla_seleccao,
    screenText: button.desig_ecra,
    subtitle: "Escolha um produto",
  }));

  return gridButtons;
};

export default function McxDataLayer({
  nextView,
  empresa,
  id,
}: {
  nextView: Views;
  empresa: Entidade;
  id: string;
}) {
  const buttons: GridButton[] = [];

  if (nextView === "servico") {
    buttons.push(...createServicosButtons(empresa.servicos));
  }

  if (nextView === "produto") {
    buttons.push(...createProdutosButtons(empresa.servicos, id));
  }

  return (
    <div className="px-16 py-8 flex items-center justify-center">
      {(!buttons || buttons.length === 0) && <NoMcxView dataModel={nextView} />}
      {buttons && buttons.length > 0 && (
        <McxSelectionView buttons={buttons} view={nextView} />
      )}
    </div>
  );
}
