"use client";

import { modals } from "@mantine/modals";

import CriarEmpresaModal from "./CriarEmpresaModal";
import { Card, Button, ThemeIcon } from "@mantine/core";
import { IconHomePlus } from "@tabler/icons-react";

export default function NoEmpresa() {
  return (
    <Card withBorder w={"max-content"} p={48} className="mx-auto mt-10">
      <div className="flex items-center mb-8">
        <div className="bg-accent w-1 h-12 mr-4" />
        <span className="font-medium">
          <p>
            Bem vindo ao&nbsp;
            <span className="font-bold text-brand-text">MCX Config</span>&#46;
          </p>
          <p>Para começar deve criar a sua empresa.</p>
        </span>
      </div>
      <Button
        onClick={() =>
          modals.open({
            title: "Criar Empresa",
            size: "xl",
            children: <CriarEmpresaModal />,
            withCloseButton: true,
          })
        }
        leftSection={<IconHomePlus size={20} />}
      >
        Criar Empresa
      </Button>
    </Card>
  );
}
