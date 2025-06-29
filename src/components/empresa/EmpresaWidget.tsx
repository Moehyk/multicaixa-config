import Link from "next/link";
import { Card, ActionIcon, Tooltip } from "@mantine/core";
import {
  IconMail,
  IconPhone,
  IconSettings,
  IconDeviceDesktop,
} from "@tabler/icons-react";

import type { Empresa } from "@prisma/client";

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

export default function EmpresaWidget(empresa: Empresa) {
  return (
    <Card
      withBorder
      px={32}
      className="h-32 flex-row justify-between items-center mb-16"
    >
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
      <div className="flex gap-4">
        <Tooltip label="Multicaixa" position="bottom">
          <ActionIcon
            component={Link}
            href="/multicaixa/mcx"
            variant="default"
            size="xl"
          >
            <IconDeviceDesktop size={32} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Editar Empresa" position="bottom">
          <ActionIcon
            component={Link}
            href="/multicaixa/empresa"
            variant="default"
            size="xl"
          >
            <IconSettings size={32} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </div>
    </Card>
  );
}
