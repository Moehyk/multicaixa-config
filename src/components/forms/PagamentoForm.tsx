"use client";

import { usePagamentoForm } from "@/hooks/forms";

import FormActions from "./FormActions";
import { TextInput, NumberInput } from "@mantine/core";

import type { ProdutoFormProps } from "@/types";

export default function PagamentoForm({ action }: ProdutoFormProps) {
  const { getInputProps, handleOpenPreviewModal } = usePagamentoForm();

  return (
    <>
      <div className="flex w-full  gap-4">
        <TextInput
          {...getInputProps("desigEcra")}
          label="Designação p/ ecrã"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("desigTeclaSeleccao")}
          label="Designação p/ tecla de selecção"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("pagamento.desigReferencia")}
          label="Designação p/ referência"
          maxLength={15}
          className="flex-1"
        />
      </div>
      <TextInput
        {...getInputProps("pagamento.textoEcraReferencia")}
        label="Texto do ecrã de referência"
        className="flex-1"
        maxLength={30}
      />
      <div className="flex w-full  gap-4">
        <NumberInput
          {...getInputProps("pagamento.tamanhoReferencia")}
          label="Tamanho da referência"
          min={9}
          max={15}
        />
        <NumberInput
          {...getInputProps("pagamento.montanteMin")}
          label="Montante mínimo"
          className="flex-1"
          suffix=" Kzs"
          allowNegative={false}
          thousandSeparator=","
          fixedDecimalScale
          decimalScale={2}
          max={99999999.99}
          min={0}
        />
        <NumberInput
          {...getInputProps("pagamento.montanteMax")}
          label="Montante máximo"
          className="flex-1"
          suffix=" Kzs"
          allowNegative={false}
          thousandSeparator=","
          fixedDecimalScale
          decimalScale={2}
          max={99999999.99}
          min={0}
        />
      </div>
      <FormActions
        submitText={action}
        openPreviewModal={handleOpenPreviewModal}
      />
    </>
  );
}
