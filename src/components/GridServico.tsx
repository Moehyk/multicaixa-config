"use client";

import { Card, Button } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";

export default function GridServico({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <Card withBorder className="justify-center gap-8">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="light"
            radius="xs"
            leftSection={<IconEdit size={16} />}
          >
            Editar
          </Button>
          <Button
            variant="light"
            size="xs"
            radius="xs"
            color="red"
            leftSection={<IconTrash size={16} />}
          >
            Apagar
          </Button>
        </div>
      </div>
      <Card
        withBorder
        bg="var(--mantine-color-body)"
        className="grid gap-2 bg-blue-50"
      >
        {children}
      </Card>
    </Card>
  );
}
