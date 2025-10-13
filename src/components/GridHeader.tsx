"use client";

import { modals } from "@mantine/modals";
import { Button } from "@mantine/core";
import { ServicoModalForm } from "@/components/servico";

export default function GridHeader({ id }: { id: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-stretch gap-2">
        <div className="w-1  bg-brand-accent" />
        <h2 className="text-xl font-semibold">Lista de Serviços</h2>
      </div>
      <Button
        onClick={() =>
          modals.open({
            title: "Criar Novo Serviço",
            children: <ServicoModalForm empresaId={id} />,
          })
        }
      >
        Novo Serviço
      </Button>
    </div>
  );
}
