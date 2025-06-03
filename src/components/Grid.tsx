import GridServico from "./GridServico";
import GridProduto from "./GridProduto";

import { Button } from "@mantine/core";

export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-stretch gap-2">
          <div className="w-1  bg-blue-500" />
          <h2 className="text-xl font-semibold">Lista de Serviços</h2>
        </div>
        <Button>Novo Serviço</Button>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </>
  );
}

Grid.Servico = GridServico;
Grid.Produto = GridProduto;
