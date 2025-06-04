"use client";
import { openContextModal } from "@mantine/modals";
import { Button } from "@mantine/core";

export default function GridHeader({ empresaId }: { empresaId: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-stretch gap-2">
        <div className="w-1  bg-blue-500" />
        <h2 className="text-xl font-semibold">Lista de Serviços</h2>
      </div>
      <Button
        onClick={() =>
          openContextModal({
            modal: "criar-servico",
            innerProps: {
              id: "",
              empresaId: empresaId,
            },
          })
        }
      >
        Novo Serviço
      </Button>
    </div>
  );
}
