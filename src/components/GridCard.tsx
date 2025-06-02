"use client";

import { Card, Button } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";

export default function GridCard({
  title,
  action,
}: {
  title: string;
  action: "SERVICO" | "CARGAMENTO" | "RECARGAMENTO";
}) {
  return (
    <Card withBorder className="justify-center gap-6 h-28">
      <h2 className="font-semibold text-xl">{title}</h2>
      <div className="flex items-center gap-2">
        <Button size="xs" radius="xs" leftSection={<IconEdit size={16} />}>
          Editar
        </Button>
        <Button
          size="xs"
          radius="xs"
          color="red"
          leftSection={<IconTrash size={16} />}
        >
          Apagar
        </Button>
      </div>
    </Card>
  );
}
