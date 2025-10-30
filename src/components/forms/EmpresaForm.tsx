"use client";

import { useEmpresaForm } from "@/hooks/forms";

import FormActions from "./FormActions";
import { TextInput, LoadingOverlay } from "@mantine/core";

import type { EmpresaForm } from "@/types";

export default function EmpresaForm(data: EmpresaForm) {
  const { getInputProps, handleSubmit, isMutating } = useEmpresaForm(data);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <LoadingOverlay visible={isMutating} />
      <div className="flex gap-4">
        <TextInput
          {...getInputProps("sigla")}
          label="Sigla"
          className="flex-1"
        />
        <TextInput
          {...getInputProps("numeroPessoaColectiva")}
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
          {...getInputProps("numeroEntidade")}
          label="Número Entidade"
          className="w-1/4"
        />
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
      </div>
      <FormActions>
        <FormActions.Voltar />
        <FormActions.Editar />
      </FormActions>
    </form>
  );
}
