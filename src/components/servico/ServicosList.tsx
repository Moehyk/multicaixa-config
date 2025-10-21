import ServicoItem from "./ServicoItem";
import GridNoServico from "./GridNoServico";
import { GridNoProduto, GridProdutos } from "../produto";

import type { ServicoData } from "@/types";

export default function ServicosList({
  servicos,
}: {
  servicos: ServicoData[];
}) {
  if (servicos.length === 0) return <GridNoServico />;

  return (
    <div className="flex flex-col gap-4">
      {servicos.map((servico) => (
        <ServicoItem key={servico.id} servico={servico}>
          <GridProdutos id={servico.id} produtos={servico.produtos} />
        </ServicoItem>
      ))}
    </div>
  );
}
