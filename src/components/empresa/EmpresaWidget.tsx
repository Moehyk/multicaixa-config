import { getEmpresa } from "@/server/services";
import { notFound } from "next/navigation";

import Link from "next/link";
import EmpresaCard from "./EmpresaCard";
import { ActionIcon, Tooltip, Button } from "@mantine/core";
import { IconDeviceDesktop, IconEdit } from "@tabler/icons-react";

export default async function EmpresaWidget() {
  const { data } = await getEmpresa();

  if (!data) {
    notFound();
  }

  return (
    <EmpresaCard>
      <div className="flex items-center justify-between ml-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{data.nome}</h2>
          <Tooltip label="Editar Empresa">
            <ActionIcon
              component={Link}
              href="/multicaixa/empresa"
              variant="transparent"
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
      </div>
    </EmpresaCard>
  );
}
