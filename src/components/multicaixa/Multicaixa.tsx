import McxCloseBtn from "./McxCloseBtn";
import McxWrapper from "./McxWrapper";
import McxHeader from "./McxHeader";
import McxMain from "./McxMain";

import type { Servico, Empresa } from "@prisma/client";
import type { GridButton } from "@/types";

let buttons: Pick<Servico, "id" | "desig_tecla_seleccao" | "desig_ecra">[] = [];
for (let i = 0; i < 32; i++) {
  buttons.push({
    id: `${i + 1}`,
    desig_tecla_seleccao: `Selection ${i + 1}`,
    desig_ecra: `Screen ${i + 1}`,
  });
}

export default function Multicaixa({ desig_ecra }: Empresa) {
  const servicosButtons: GridButton[] = buttons.map((servico) => ({
    id: servico.id,
    text: servico.desig_tecla_seleccao,
  }));

  return (
    <McxWrapper>
      <McxCloseBtn />
      <McxHeader title={desig_ecra} dataModel="servico" />
      <McxMain
        buttons={servicosButtons}
        header={desig_ecra}
        dataModel="servico"
      />
    </McxWrapper>
  );
}
