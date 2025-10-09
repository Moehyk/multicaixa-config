"use client";

import { useRecargasForm } from "@/hooks/forms";

import Link from "next/link";
import MaxItemsAlert from "./MaxItemsAlert";
import { TextInput, NumberInput, Button, Fieldset, Paper } from "@mantine/core";
import { IconTrash, IconDeviceDesktop } from "@tabler/icons-react";

import type { ProdutoFormProps } from "@/types";

export default function RecargasForm({
  action,
  isSubmitting,
}: ProdutoFormProps) {
  const {
    getInputProps,
    montantes,
    handleInsertItem,
    handleRemoveItem,
    handleOpenPreviewModal,
  } = useRecargasForm();

  return (
    <>
      <div className="flex items-end w-full  gap-4">
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
          {...getInputProps("recargas.desigUnidade")}
          label="Designação p/ Unidades"
          className="flex-1"
          maxLength={15}
        />
      </div>
      <h2 className="text-lg font-semibold my-2">Configurar Recargas</h2>
      <Paper withBorder p={24} bg={"var(--mantine-body-accent)"}>
        <div className="flex gap-4 items-center mb-4">
          <Button
            variant="default"
            size="md"
            disabled={montantes?.length === 8}
            onClick={handleInsertItem}
          >
            Adicionar Recarga
          </Button>
          {montantes?.length === 8 && <MaxItemsAlert max={8} />}
        </div>
        <div className="grid grid-cols-4 grid-rows-auto gap-4">
          {montantes?.map((m, i) => (
            <Fieldset
              legend={`Recarga ${i + 1}`}
              key={m.id ? m.id : m.key}
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
                onClick={() => handleRemoveItem(i)}
              >
                Remover
              </Button>
            </Fieldset>
          ))}
        </div>
      </Paper>

      <div className="flex gap-2 pt-8">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button
          variant="outline"
          size="md"
          rightSection={<IconDeviceDesktop size={20} />}
          onClick={handleOpenPreviewModal}
        >
          Visualizar
        </Button>
        <Button size="md" type="submit" loading={isSubmitting}>
          {action}
        </Button>
      </div>
    </>
  );
}
