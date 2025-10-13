"use client";

import { modals } from "@mantine/modals";
import { useServicoForm } from "@/hooks/forms";

import { Button, TextInput } from "@mantine/core";

import type { ServicoForm } from "@/types";

export default function ServicoModalForm({
  empresaId,
  servico,
}: {
  empresaId: string;
  servico?: ServicoForm;
}) {
  const { handleSubmit, getInputProps, isMutating } = useServicoForm(
    empresaId,
    servico
  );

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <div className="flex flex-col">
        <TextInput
          {...getInputProps("desigSistema")}
          label="Designação p/ Sistema"
        />
        <TextInput {...getInputProps("desigEcra")} label="Designação p/ Ecrã" />
        <TextInput
          {...getInputProps("desigTeclaSeleccao")}
          label="Designação p/ Selecção"
        />
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          variant="default"
          onClick={() => {
            modals.closeAll();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isMutating}>
          {servico?.id ? "Editar" : "Criar"} Serviço
        </Button>
      </div>
    </form>
  );
}
