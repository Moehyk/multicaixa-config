"use client";

import { Card, ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function NewGridItem({
  action,
}: {
  action: "SERVICO" | "CARGAMENTO" | "RECARGAMENTO";
}) {
  const title: { [key: string]: string } = {
    SERVICO: "Adicionar Serviço",
    CARGAMENTO: "Adicionar Cargamento",
    RECARGAMENTO: "Adicionar Recargamento",
  };

  return (
    <Card
      bg="brand"
      className="cursor-pointer justify-center items-center gap-2 h-28"
      onClick={() => console.log("click")}
    >
      <ThemeIcon variant="white" size={24} radius="xl">
        <IconPlus size={64} />
      </ThemeIcon>
      <h2 className="text-white font-semibold">{title[action]}</h2>
    </Card>
  );
}
