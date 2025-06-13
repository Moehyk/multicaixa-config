import { Paper } from "@mantine/core";

import type { Views } from "@/types";

export default function NoMcxView({ dataModel }: { dataModel: Views }) {
  const unavailableText: { [key: string]: string } = {
    servico: "Sem serviços disponíveis",
    produto: "Sem produtos disponíveis",
    recarga: "Sem recargas disponíveis",
  };
  return (
    <Paper p="xl" className="mx-auto mb-80 text-center shadow-none">
      <p className="text-xl font-medium">{unavailableText[dataModel]}</p>
    </Paper>
  );
}
