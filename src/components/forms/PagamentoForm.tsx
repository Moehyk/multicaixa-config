import { usePagamentoFormContext } from "@/context/forms";

import Link from "next/link";
import { TextInput, NumberInput, Button } from "@mantine/core";

import type { ProdutoFormProps } from "@/types";

export default function PagamentoForm({
  action,
  isSubmitting,
}: ProdutoFormProps) {
  const { getInputProps } = usePagamentoFormContext();

  return (
    <>
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
          maxLength={15}
          className="flex-1"
        />
      </div>
      <TextInput
        {...getInputProps("pagamento.texto_ecra_referencia")}
        label="Texto do ecrã de referência"
        className="flex-1"
        maxLength={30}
      />
      <div className="flex w-full  gap-4">
        <NumberInput
          {...getInputProps("pagamento.tamanho_referencia")}
          label="Tamanho da referência"
          min={9}
          max={15}
        />
        <NumberInput
          {...getInputProps("pagamento.montante_minimo")}
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
          {...getInputProps("pagamento.montante_maximo")}
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
      <div className="flex gap-2 pt-4">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button size="md" type="submit" loading={isSubmitting}>
          {action}
        </Button>
      </div>
    </>
  );
}
