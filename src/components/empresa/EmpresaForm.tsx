"use client";

import { updateEmpresa } from "@/server/services";
import { useFormMutation, useEmpresaForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import Link from "next/link";
import { Button, TextInput } from "@mantine/core";

import type { EmpresaForm } from "@/types";
import { Empresa } from "@prisma/client";

export default function EmpresaForm(data: Empresa) {
  const { getInputProps, onSubmit, setInitialValues, setValues } =
    useEmpresaForm(data);
  const { isMutating, setIsFetching, startTransition, push, back } =
    useFormMutation();

  const handleSubmit = async (values: Empresa) => {
    setIsFetching(true);
    const response = await updateEmpresa(values);
    setIsFetching(false);

    if (response.status !== 200) {
      errorNotification(response);
    }

    sucessNotification(response);
    startTransition(() => push("/multicaixa"));
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit(handleSubmit)}>
      <div className="px-8">
        <div className="flex gap-4">
          <TextInput
            {...getInputProps("sigla")}
            label="Sigla"
            className="flex-1"
          />
          <TextInput
            {...getInputProps("numero_pessoa_colectiva")}
            label="Número Pessoa Colectiva"
            className="flex-1 h-24"
          />
          <TextInput
            {...getInputProps("cae")}
            label="CAE"
            className="flex-1 h-24"
          />
        </div>
        <TextInput {...getInputProps("nome")} label="Nome" />
        <div className="flex items-end gap-4">
          <TextInput
            {...getInputProps("morada")}
            label="Morada"
            className="flex-1"
          />
          <TextInput
            {...getInputProps("localidade")}
            label="Localidade"
            className="w-1/4"
          />
        </div>
        <div className="flex items-end gap-4">
          <TextInput
            {...getInputProps("responsavel")}
            label="Responsável"
            className="flex-1"
          />
          <TextInput
            {...getInputProps("telefone")}
            label="Telefone"
            className="w-1/4"
          />
          <TextInput
            {...getInputProps("email")}
            label="Email"
            className="w-1/4"
          />
        </div>
        <div className="flex items-end gap-4">
          <TextInput
            {...getInputProps("numero_entidade")}
            label="Número Entidade"
            className="w-1/4"
          />
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
        </div>
      </div>
      <div className="flex gap-2 bg-modal-footer p-8 border-t border-modal-footer-b">
        <Button
          component={Link}
          href="/multicaixa"
          variant="default"
          size="lg"
          type="submit"
        >
          Voltar
        </Button>
        <Button size="lg" type="submit" loading={isMutating}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
