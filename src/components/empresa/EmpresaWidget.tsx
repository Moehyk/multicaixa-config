import { initEmpresa } from "@/server/services";
import { redirect } from "next/navigation";

import Link from "next/link";
import CriarEmpresaModal from "./CriarEmpresaModal";
import { Card, ActionIcon, Tooltip } from "@mantine/core";
import { IconMail, IconPhone, IconSettings } from "@tabler/icons-react";

function IconGroup({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <span>{text}</span>
    </div>
  );
}

export default async function EmpresaWidget() {
  const { empresa } = await initEmpresa();

  if (!empresa) {
    return <CriarEmpresaModal />;
  }

  return (
    <div className="relative h-32 mb-8">
      <Card withBorder className="pl-16 pr-8 ml-12 h-32 flex justify-center">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">{empresa.nome}</p>
            <div className="text-sm flex gap-6">
              <IconGroup text={empresa.email}>
                <IconMail />
              </IconGroup>
              <IconGroup text={empresa.telefone}>
                <IconPhone />
              </IconGroup>
            </div>
          </div>
          <Tooltip label="Editar Empresa" position="bottom">
            <ActionIcon
              component={Link}
              href="/empresa"
              variant="default"
              size="xl"
            >
              <IconSettings size={32} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
}
