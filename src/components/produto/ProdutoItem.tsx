"use client";

import { deleteProduto } from "@/server/services";
import { modals } from "@mantine/modals";

import Link from "next/link";
import { GridItem } from "@/components";
import { Badge, ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";

import { gridProdutoBadgeColor } from "@/config";

import type { Produto, ProdutoTipo } from "@prisma/client";

function ProdutoItemTitle({
  title,
  type,
}: {
  title: string;
  type: ProdutoTipo;
}) {
  return (
    <>
      <h2 className="font-semibold">{title}</h2>
      <Badge variant="light" size="sm" color={gridProdutoBadgeColor[type]}>
        {type}
      </Badge>
    </>
  );
}

function ProdutoItemActions({ id }: { id: string }) {
  const handleDeleteProduto = () =>
    modals.openContextModal({
      title: "Apagar Produto",
      modal: "confirm-delete",
      innerProps: {
        model: "produto",
        dataId: id,
        onDelete: deleteProduto,
      },
    });

  return (
    <>
      <Tooltip label="Editar Produto" position="top">
        <ActionIcon
          component={Link}
          href={`/multicaixa/produto/${id}`}
          size="lg"
          variant="default"
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Apagar Produto" position="top">
        <ActionIcon size="lg" variant="default" onClick={handleDeleteProduto}>
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  );
}

export default function ProdutoItem({ id, desigEcra, type }: Produto) {
  return (
    <GridItem
      titleSection={<ProdutoItemTitle title={desigEcra} type={type} />}
      actionsSection={<ProdutoItemActions id={id} />}
    />
  );
}
