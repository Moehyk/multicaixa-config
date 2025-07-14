import { getEmpresa } from "@/server/services";
import { notFound } from "next/navigation";

import Link from "next/link";
import { ActionIcon, Tooltip, Button } from "@mantine/core";
import { IconDeviceDesktop, IconEdit } from "@tabler/icons-react";

export default async function EmpresaToolbar() {
  const { data } = await getEmpresa();

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-white font-bold">{data.nome}</h2>
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
      <Button
        component={Link}
        href="/multicaixa/mcx"
        radius="xl"
        rightSection={<IconDeviceDesktop size={20} />}
      >
        Multicaixa
      </Button>
    </>
  );
}
