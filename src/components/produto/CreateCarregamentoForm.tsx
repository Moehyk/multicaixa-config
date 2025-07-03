"use client";

import { createProdutoCarregamento } from "@/server/services";
import { randomId } from "@mantine/hooks";
import { useProdutoCarregamentoForm, useFormMutation } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import Link from "next/link";
import MaxItemsAlert from "./MaxItemsAlert";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  Fieldset,
} from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";

import type { ProdutoCarregamentoForm } from "@/types";
import type { MontanteTipo } from "@prisma/client";

export default function CreateCarregamentoForm({
  servicoId,
}: {
  servicoId: string;
}) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const {
    getValues,
    getInputProps,
    onSubmit,
    insertListItem,
    removeListItem,
    setFieldValue,
  } = useProdutoCarregamentoForm();

  const montanteTipo = getValues().carregamento.montante_tipo;
  const montantes = getValues().carregamento.montantes;

  const handleSubmit = async (values: ProdutoCarregamentoForm) => {
    setIsFetching(true);
    const response = await createProdutoCarregamento(servicoId, values);
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
      <div className="w-full flex gap-4">
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
          {...getInputProps("carregamento.desig_referencia")}
          label="Designação p/ referência"
          maxLength={15}
          className="flex-1"
        />
      </div>
      <div className="flex gap-4">
        <NumberInput
          {...getInputProps("carregamento.tamanho_referencia")}
          label="Tamanho da referência"
          min={9}
          max={15}
          className="w-1/6"
        />
        <TextInput
          {...getInputProps("carregamento.texto_ecra_referencia")}
          label="Texto do ecrã de referência"
          className="flex-1"
          maxLength={60}
        />
      </div>
      <h2 className="text-lg font-medium my-2">Configurar Montantes</h2>
      <div className="p-8 bg-body border border-border">
        <div className="flex items-center gap-2 w-full mb-8">
          <Select
            value={montanteTipo}
            onChange={(e) =>
              setFieldValue("carregamento.montante_tipo", e as MontanteTipo)
            }
            data={[
              { value: "montante_livre", label: "Montante Livre" },
              {
                value: "montante_pre_definido",
                label: "Montantes Pré-definidos",
              },
              { value: "ambos", label: "Ambos Tipos de Montantes" },
            ]}
            className="w-1/4"
          />
          {montanteTipo !== "montante_livre" && montantes.length < 8 && (
            <>
              <Button
                variant="transparent"
                size="md"
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  insertListItem("carregamento.montantes", {
                    descricao: "",
                    montante: 0.0,
                    key: randomId(),
                  })
                }
              >
                Adicionar Montante
              </Button>
            </>
          )}
          <>{montantes.length === 8 && <MaxItemsAlert max={8} />}</>
        </div>
        {montanteTipo !== "montante_pre_definido" && (
          <div className="flex w-full  gap-4">
            <NumberInput
              {...getInputProps("carregamento.montante_minimo")}
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
              {...getInputProps("carregamento.montante_maximo")}
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
        )}

        {montanteTipo !== "montante_livre" && (
          <div className="grid grid-cols-4 grid-rows-auto gap-4">
            {montantes.map((m, i) => (
              <Fieldset
                legend={`Montante ${i + 1}`}
                key={m.key}
                className="flex flex-col"
              >
                <NumberInput
                  {...getInputProps(`carregamento.montantes.${i}.montante`)}
                  label="Montante"
                  suffix=" Kzs"
                  allowNegative={false}
                  thousandSeparator=","
                  fixedDecimalScale
                  decimalScale={2}
                  max={99999999.99}
                  min={0}
                />
                <TextInput
                  {...getInputProps(`carregamento.montantes.${i}.descricao`)}
                  label="Descrição"
                />

                <Button
                  variant="outline"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  disabled={montantes.length === 1}
                  onClick={() => removeListItem(`carregamento.montantes`, i)}
                >
                  Remover
                </Button>
              </Fieldset>
            ))}
          </div>
        )}
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
