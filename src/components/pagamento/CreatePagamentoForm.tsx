"use client";

import Link from "next/link";
import { TextInput, NumberInput, Button } from "@mantine/core";

export default function CreatePagamentoForm({
  servicoId,
}: {
  servicoId: string;
}) {
  return (
    <form className="pt-12">
      <div className="flex w-full  gap-4">
        <TextInput label="Designação p/ ecrã" className="flex-1" />
        <TextInput label="Designação p/ tecla de selecção" className="flex-1" />
        <TextInput label="Designação p/ referência" className="flex-1" />
      </div>
      <TextInput label="Texto do ecrã de referência" className="flex-1" />
      <div className="flex w-full  gap-4">
        <NumberInput label="Tamanho da referência" />
        <NumberInput label="Montante mínimo" className="flex-1" />
        <NumberInput label="Montante máximo" className="flex-1" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button size="md" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
