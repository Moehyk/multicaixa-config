import { Paper } from "@mantine/core";

import type { DataModel } from "@/types";

export default function NoMcxView({ dataModel }: { dataModel: DataModel }) {
  const unavailableText: { [key: string]: string } = {
    servico: "Sem serviços disponíveis",
    produto: "Sem produtos disponíveis",
  };
  return (
    <Paper p="xl" className="mx-auto mb-80 text-center shadow-none">
      <p className="text-xl font-medium">{unavailableText[dataModel]}</p>
    </Paper>
  );
}
