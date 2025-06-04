import GridServico from "./GridServico";
import GridProduto from "./GridProduto";
import GridNoProduto from "./GridNoProduto";
import GridNoServico from "./GridNoServico";

export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

Grid.Servico = GridServico;
Grid.Produto = GridProduto;
Grid.NoProduto = GridNoProduto;
Grid.NoServico = GridNoServico;
