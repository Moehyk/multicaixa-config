"use client";

import { useCarregamentoForm } from "@/hooks/forms";
import { useCarregamentoFormContext } from "@/context/forms";
import { randomId } from "@mantine/hooks";

import FormActions from "./FormActions";
import MaxItemsAlert from "../forms/MaxItemsAlert";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  Fieldset,
  Paper,
} from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";

import type { MontanteTipo } from "@prisma/client";
import type { ProdutoFormProps } from "@/types";

function MontanteLivre() {
  const { getInputProps } = useCarregamentoFormContext();

  return (
    <div className="flex w-full  gap-4">
      <NumberInput
        {...getInputProps("carregamento.montanteMin")}
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
        {...getInputProps("carregamento.montanteMax")}
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
  );
}

function MontantePre({ montantesMaxLength }: { montantesMaxLength: number }) {
  const { getInputProps, getValues, insertListItem, removeListItem } =
    useCarregamentoFormContext();

  const montantes = getValues().carregamento?.montantes;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="md"
          disabled={montantes && montantes.length >= montantesMaxLength}
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
        <>
          {montantes && montantes.length === montantesMaxLength && (
            <MaxItemsAlert max={montantesMaxLength} />
          )}
        </>
      </div>
      <div className="grid grid-cols-4 grid-rows-auto gap-4">
        {montantes?.map((m, i) => (
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
  );
}

function renderMontantesConfig(tipo: MontanteTipo) {
  if (tipo === "montante_livre") {
    return <MontanteLivre />;
  }

  if (tipo === "montante_pre_definido") {
    return <MontantePre montantesMaxLength={10} />;
  }

  return (
    <>
      <MontanteLivre />
      <MontantePre montantesMaxLength={8} />
    </>
  );
}

export default function CarregamentoForm({ action }: ProdutoFormProps) {
  const {
    getInputProps,
    getValues,
    handleMontanteTipoChange,
    handleOpenPreviewModal,
  } = useCarregamentoForm();

  const montanteTipo = getValues().carregamento?.montanteTipo;

  return (
    <>
      <div className="w-full flex gap-4">
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
          {...getInputProps("carregamento.desigReferencia")}
          label="Designação p/ referência"
          maxLength={15}
          className="flex-1"
        />
      </div>
      <div className="flex gap-4">
        <NumberInput
          {...getInputProps("carregamento.tamanhoReferencia")}
          label="Tamanho da referência"
          min={9}
          max={15}
          className="w-1/6"
        />
        <TextInput
          {...getInputProps("carregamento.textoEcraReferencia")}
          label="Texto do ecrã de referência"
          className="flex-1"
          maxLength={60}
        />
      </div>
      <div className="flex items-center gap-4 mb-2 mt-4">
        <h2 className="text-lg font-semibold my-2">Configurar Montantes</h2>
        {action === "Criar" && (
          <Select
            size="xs"
            value={montanteTipo}
            onChange={(e) => handleMontanteTipoChange(e as MontanteTipo)}
            data={[
              { value: "montante_livre", label: "Livre" },
              {
                value: "montante_pre_definido",
                label: "Pré-definidos",
              },
              { value: "ambos", label: "Ambos" },
            ]}
          />
        )}
      </div>
      <Paper
        withBorder
        p={24}
        bg={"var(--mantine-body-accent)"}
        className="flex flex-col gap-4"
      >
        {renderMontantesConfig(montanteTipo as MontanteTipo)}
      </Paper>
      <FormActions
        submitText={action}
        openPreviewModal={handleOpenPreviewModal}
      />
    </>
  );
}
