"use client";

import Link from "next/link";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

export default function EmpresaName({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg text-white font-bold">{name}</h2>
      <Tooltip label="Editar Empresa">
        <ActionIcon
          component={Link}
          href="/multicaixa/empresa"
          variant="transparent"
          color="white"
        >
          <IconEdit size={20} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
