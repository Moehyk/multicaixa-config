import { Grid } from "@/components";
import ServicoItem from "./ServicoItem";

import type { ServicoData } from "@/types";

export default async function GridServicos({
  servicos,
}: {
  servicos: ServicoData[];
}) {
  return (
    <>
      {servicos.map((servico) => (
        <ServicoItem key={servico.id} servico={servico}>
          <>
            {servico.produtos.length === 0 && (
              <Grid.NoProduto id={servico.id} />
            )}
            {servico.produtos.length > 0 && (
              <Grid.Produtos key={servico.id} produtos={servico.produtos} />
            )}
          </>
        </ServicoItem>
      ))}
    </>
  );
}
