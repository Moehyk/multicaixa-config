import GridServico from "./servico/ServicoItem";
import GridProduto from "./produto/GridProduto";
import GridNoProduto from "./produto/GridNoProduto";
import GridNoServico from "./servico/GridNoServico";

export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

Grid.Servico = GridServico;
Grid.Produto = GridProduto;
Grid.NoProduto = GridNoProduto;
Grid.NoServico = GridNoServico;
