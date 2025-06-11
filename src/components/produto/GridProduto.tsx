"use client";

import { Card, ActionIcon, Tooltip, Badge } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";

import { gridProdutoBadgeColor } from "@/config";

import type { Produto } from "@prisma/client";

export default function GridProduto({ desig_ecra, type }: Produto) {
  return (
    <Card withBorder className="flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4">
        <h2 className="font-semibold">{desig_ecra}</h2>
        <Badge variant="light" size="sm" color={gridProdutoBadgeColor[type]}>
          {type}
        </Badge>
      </div>
      <ActionIcon.Group>
        <Tooltip label="Editar Produto" position="top">
          <ActionIcon size="lg" variant="default">
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Apagar Produto" position="top">
          <ActionIcon size="lg" variant="default">
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </Card>
  );
}
