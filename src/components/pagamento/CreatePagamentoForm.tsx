"use client";

import { useProdutoPagamentoForm } from "@/hooks/forms";

import Link from "next/link";
import { TextInput, NumberInput, Button } from "@mantine/core";

import type { ProdutoPagamentoForm } from "@/types";

export default function CreatePagamentoForm({
  servicoId,
}: {
  servicoId: string;
}) {
  const { getInputProps, onSubmit, getValues } = useProdutoPagamentoForm();

  const handleSubmit = async (values: ProdutoPagamentoForm) => {
    console.log("clicked");
    console.log(values);
    console.log("servico", servicoId);
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="pt-12">
      <div className="flex w-full  gap-4">
        <TextInput
          {...getInputProps("desig_ecra")}
          label="Designação p/ ecrã"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("desig_tecla_seleccao")}
          label="Designação p/ tecla de selecção"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("pagamento.desig_referencia")}
          label="Designação p/ referência"
          className="flex-1"
        />
      </div>
      <TextInput
        {...getInputProps("pagamento.texto_ecra_referencia")}
        label="Texto do ecrã de referência"
        className="flex-1"
      />
      <div className="flex w-full  gap-4">
        <NumberInput
          {...getInputProps("pagamento.tamanho_referencia")}
          label="Tamanho da referência"
        />
        <NumberInput
          {...getInputProps("pagamento.montante_minimo")}
          label="Montante mínimo"
          className="flex-1"
        />
        <NumberInput
          {...getInputProps("pagamento.montante_maximo")}
          label="Montante máximo"
          className="flex-1"
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button size="md" type="submit">
          Criar
        </Button>
      </div>
    </form>
  );
}
