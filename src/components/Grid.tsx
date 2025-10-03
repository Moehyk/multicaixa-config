import { GridProdutos, GridNoProduto } from "./produto";
import { GridServicos, GridNoServico } from "./servico";

export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

Grid.Servicos = GridServicos;
Grid.NoServico = GridNoServico;
Grid.Produtos = GridProdutos;
Grid.NoProduto = GridNoProduto;
