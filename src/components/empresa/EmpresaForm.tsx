"use client";

import { updateEmpresa } from "@/server/actions";
import { useFormMutation, useEmpresaForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { Button, TextInput } from "@mantine/core";

import type { EmpresaForm } from "@/types";

export default function EmpresaForm({ id }: { id: string | undefined }) {
  const { getInputProps, onSubmit } = useEmpresaForm();
  const { isMutating, setIsFetching, startTransition, push, back } =
    useFormMutation();

  const handleSubmit = async (values: EmpresaForm) => {
    console.log("values", values);
    //setIsFetching(true);
    const response = await updateEmpresa(values, id);
    //setIsFetching(false);

    console.log("response", response);

    console.log("values", values);
  };

  return (
    <form className="flex flex-col mt-4" onSubmit={onSubmit(handleSubmit)}>
      <div className="flex gap-4">
        <TextInput
          {...getInputProps("sigla")}
          label="Sigla"
          placeholder="Sigla da empresa"
          className="flex-1"
          size="md"
        />
        <TextInput
          {...getInputProps("numero_pessoa_colectiva")}
          label="Número Pessoa Colectiva"
          placeholder="Número Pessoa Colectiva"
          className="flex-1 h-24"
        />
        <TextInput
          {...getInputProps("cae")}
          label="CAE"
          placeholder="CAE da Empresa"
          className="flex-1 h-24"
        />
      </div>
      <TextInput
        {...getInputProps("nome")}
        label="Nome"
        placeholder="Nome da Empresa"
      />
      <div className="flex items-end gap-4">
        <TextInput
          {...getInputProps("morada")}
          label="Morada"
          placeholder="Morada da Empresa"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("localidade")}
          label="Localidade"
          placeholder="Localidade da Empresa"
          className="w-1/4"
        />
      </div>
      <div className="flex items-end gap-4">
        <TextInput
          {...getInputProps("responsavel")}
          label="Responsável"
          placeholder="Responsável pela Empresa"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("telefone")}
          label="Telefone"
          placeholder="Telefone da Empresa"
          className="w-1/4"
        />
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="Email da Empresa"
          className="w-1/4"
        />
      </div>
      <TextInput
        {...getInputProps("logo")}
        label="Logo"
        placeholder="Url para o logo da empresa"
      />
      <div className="flex items-end gap-4">
        <TextInput
          {...getInputProps("numero_entidade")}
          label="Número Entidade"
          placeholder="Número Entidade"
          className="w-1/4"
        />
        <TextInput
          {...getInputProps("desig_ecra")}
          label="Designação p/ ecrã"
          placeholder="Nome que irá aparecer no ecrã Multicaixa"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("desig_tecla_seleccao")}
          label="Designação p/ tecla de selecção"
          placeholder="Nome para a tecla de selecção no Multicaixa"
          className="flex-1"
        />
      </div>
      <Button
        size="lg"
        type="submit"
        className="max-w-fit mt-2"
        loading={isMutating}
      >
        Salvar
      </Button>
    </form>
  );
}
