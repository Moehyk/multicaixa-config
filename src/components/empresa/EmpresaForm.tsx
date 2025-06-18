"use client";

import { upsertEmpresa } from "@/server/services";
import { useFormMutation, useEmpresaForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import Link from "next/link";
import { Button, TextInput, Card } from "@mantine/core";
import { CardTitle } from "@/components";

import type { EmpresaForm } from "@/types";

export default function EmpresaForm(data: EmpresaForm) {
  const { getInputProps, onSubmit } = useEmpresaForm(data);
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const handleSubmit = async (values: EmpresaForm) => {
    setIsFetching(true);
    const response = await upsertEmpresa(values);
    setIsFetching(false);

    if (response.status !== 200) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <>
      <Card withBorder p={32}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <CardTitle title="Dados da Empresa" />
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
          <div className="flex gap-2">
            <Button
              component={Link}
              href="/multicaixa"
              variant="default"
              size="md"
            >
              Voltar
            </Button>
            <Button size="md" type="submit" loading={isMutating}>
              Salvar
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
