import { useMulticaixaController } from "@/context/multicaixa-controller";

import McxToolbar from "./McxToolbar";
import McxWrapper from "./McxWrapper";
import McxHeader from "./McxHeader";
import McxSelectionView from "./McxSelectionView";

import type { Empresa } from "@prisma/client";
import type { GridButton } from "@/types";

const createButtons = (initArray: any[], size: number, text: string) => {
  const buttonsArray = [...initArray];
  for (let i = 0; i < size; i++) {
    buttonsArray.push({
      id: `${i + 1}`,
      desig_tecla_seleccao: `${text} ${i + 1}`,
      desig_ecra: `Screen ${i + 1}`,
    });
  }

  const gridButtons: GridButton[] = buttonsArray.map((button) => ({
    id: button.id,
    text: button.desig_tecla_seleccao,
  }));

  return gridButtons;
};

const servicosData: {
  id: string;
  desig_tecla_seleccao: string;
  desig_ecra: string;
}[] = [];

const produtosData: {
  id: string;
  desig_tecla_seleccao: string;
  desig_ecra: string;
}[] = [];

export default function Multicaixa({ desig_ecra }: Empresa) {
  const servicosButtons: GridButton[] = createButtons(
    servicosData,
    4,
    "Serviço"
  );
  const produtosButtons: GridButton[] = createButtons(
    produtosData,
    10,
    "Produto"
  );

  const { view } = useMulticaixaController();

  return (
    <McxWrapper>
      <McxToolbar />
      <McxHeader />
      {view === "empresa" && (
        <McxSelectionView buttons={servicosButtons} dataModel="servico" />
      )}
      {view === "servico" && (
        <McxSelectionView buttons={produtosButtons} dataModel="produto" />
      )}
    </McxWrapper>
  );
}
