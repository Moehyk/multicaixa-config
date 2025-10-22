import ServicoItem from "./ServicoItem";
import GridNoServico from "./GridNoServico";
import { GridNoProduto, ProdutoItem } from "../produto";

import type { ServicoData } from "@/types";

export default function ServicosList({
  servicos,
}: {
  servicos: ServicoData[];
}) {
  if (servicos.length === 0) return <GridNoServico />;

  return (
    <div className="flex flex-col gap-4">
      {servicos.map((s) => (
        <ServicoItem key={s.id} servico={s}>
          {s.produtos.length === 0 && <GridNoProduto id={s.id} />}
          {s.produtos.length > 0 && (
            <>
              {s.produtos.map((p) => (
                <ProdutoItem
                  key={p.id}
                  produto={p}
                  servicoParams={{
                    s: s.desigSistema,
                    e: s.desigEcra,
                  }}
                />
              ))}
            </>
          )}
        </ServicoItem>
      ))}
    </div>
  );
}
