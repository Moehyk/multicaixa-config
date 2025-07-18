import { randomId } from "@mantine/hooks";
import { useCarregamentoFormContext } from "@/context/forms";

import Link from "next/link";
import MaxItemsAlert from "../forms/MaxItemsAlert";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  Fieldset,
} from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";

import type { MontanteTipo } from "@prisma/client";
import type { ProdutoFormProps } from "@/types";

export default function CarregamentoForm({
  action,
  isSubmitting,
}: ProdutoFormProps) {
  const {
    getInputProps,
    insertListItem,
    removeListItem,
    getValues,
    setFieldValue,
  } = useCarregamentoFormContext();
  const montanteTipo = getValues().carregamento.montante_tipo;
  const montantes = getValues().carregamento.montantes;

  return (
    <>
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
      <div className="flex items-center gap-4 mb-2 mt-4">
        <h2 className="text-lg font-semibold my-2">Configurar Montantes</h2>
        <Select
          size="xs"
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
            { value: "ambos", label: "Ambos" },
          ]}
        />
      </div>
      <div className="p-6 bg-body-accent border border-border rounded-md flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="md"
                disabled={montantes.length >= 8}
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
              <>{montantes.length === 8 && <MaxItemsAlert max={8} />}</>
            </div>
            <div className="grid grid-cols-4 grid-rows-auto gap-4">
              {montantes.map((m, i) => (
                <Fieldset
                  legend={`Montante ${i + 1}`}
                  key={m.id ? m.id : m.key}
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
          </div>
        )}
      </div>
      <div className="flex gap-2 pt-8">
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
