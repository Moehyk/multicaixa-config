"use client";

import { createProdutoRecargas } from "@/server/services";
import { randomId } from "@mantine/hooks";
import { useFormMutation, useProdutoRecargasForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import Link from "next/link";
import MaxItemsAlert from "./MaxItemsAlert";
import { TextInput, NumberInput, Button, Fieldset, Alert } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import type { ProdutoRecargasForm } from "@/types";

export default function CreateRecargasForm({
  servicoId,
}: {
  servicoId: string;
}) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const { getInputProps, onSubmit, insertListItem, removeListItem, getValues } =
    useProdutoRecargasForm();

  const montantes = getValues().recargas.montantes;

  const handleSubmit = async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await createProdutoRecargas(servicoId, values);
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="pt-12">
      <div className="flex items-end w-full  gap-4">
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
          {...getInputProps("recargas.desig_unidade")}
          label="Designação p/ Unidades"
          className="flex-1"
          maxLength={15}
        />
      </div>
      <h2 className="text-lg font-semibold my-2">Configurar Recargas</h2>
      <div className="p-6 bg-body border border-border">
        <div className="flex gap-4 items-center mb-4">
          <Button
            variant="default"
            size="md"
            disabled={montantes.length === 8}
            onClick={() =>
              insertListItem("recargas.montantes", {
                quantidade: 0,
                montante: 0.0,
                key: randomId(),
              })
            }
          >
            Adicionar Recarga
          </Button>
          {montantes.length === 8 && <MaxItemsAlert max={8} />}
        </div>
        <div className="grid grid-cols-4 grid-rows-auto gap-4">
          {montantes.map((m, i) => (
            <Fieldset
              legend={`Recarga ${i + 1}`}
              key={m.key}
              className="flex flex-col"
            >
              <NumberInput
                {...getInputProps(`recargas.montantes.${i}.quantidade`)}
                label="Quantidade"
                allowNegative={false}
                thousandSeparator=","
                max={99999999}
                min={0}
              />
              <NumberInput
                {...getInputProps(`recargas.montantes.${i}.montante`)}
                label="Montante"
                suffix=" Kzs"
                allowNegative={false}
                thousandSeparator=","
                fixedDecimalScale
                decimalScale={2}
                max={99999999.99}
                min={0}
              />
              <Button
                variant="outline"
                color="red"
                leftSection={<IconTrash size={16} />}
                disabled={montantes.length === 1}
                onClick={() => removeListItem(`recargas.montantes`, i)}
              >
                Remover
              </Button>
            </Fieldset>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-8">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button size="md" type="submit" loading={isMutating}>
          Criar
        </Button>
      </div>
    </form>
  );
}
