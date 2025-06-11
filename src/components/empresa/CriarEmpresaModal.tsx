"use client";

import { upsertEmpresa } from "@/server/actions";
import { useEmpresaModalForm, useFormMutation } from "@/hooks";
import { modals } from "@mantine/modals";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { Stepper, TextInput, Button, Modal } from "@mantine/core";

import type { EmpresaForm } from "@/types";

function ConfirmSection({ values }: { values: EmpresaForm }) {
  return (
    <div className="rounded-sm p-2 grid grid-cols-2 grid-flow-row gap-2">
      <p className="font-medium">Nome</p>
      {values.nome}
      <p className="font-medium">Sigla</p>
      {values.sigla}
      <p className="font-medium">Morada</p>
      {values.morada}
      <p className="font-medium">Localidade</p>
      {values.localidade}
      <p className="font-medium">Responsável</p>
      {values.responsavel}
      <p className="font-medium">Telefone</p>
      {values.telefone}
      <p className="font-medium">Email</p>
      {values.email}
      <p className="font-medium">Número Entidade</p>
      {values.numero_entidade}
      <p className="font-medium">Designação p/ ecrã</p>
      {values.desig_ecra}
      <p className="font-medium">Designação p/ tecla de selecção</p>
      {values.desig_tecla_seleccao}
    </div>
  );
}

export default function EmpresaModalForm() {
  const {
    active,
    nextStep,
    prevStep,
    form: { getInputProps, values, key },
  } = useEmpresaModalForm();

  const { isMutating, setIsFetching } = useFormMutation();

  const handleSubmit = async () => {
    setIsFetching(true);

    const response = await upsertEmpresa(values);

    setIsFetching(false);
    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      modals.closeAll();
    }
  };

  return (
    <>
      <div className="p-4">
        <Stepper active={active} className="h-96">
          <Stepper.Step label="Dados da Empresa">
            <div className="flex gap-2">
              <TextInput
                {...getInputProps("nome")}
                key={key("nome")}
                label="Nome"
                className="flex-1"
              />
              <TextInput
                {...getInputProps("sigla")}
                key={key("sigla")}
                label="Sigla"
              />
            </div>
            <div className="flex gap-2">
              <TextInput
                {...getInputProps("morada")}
                key={key("morada")}
                label="Morada"
                className="flex-1"
              />
              <TextInput
                {...getInputProps("localidade")}
                key={key("localidade")}
                label="Localidade"
              />
            </div>
            <div className="flex gap-2">
              <TextInput
                {...getInputProps("numero_pessoa_colectiva")}
                key={key("numero_pessoa_colectiva")}
                label="Número Pessoa Colectiva"
                className="flex-1"
              />
              <TextInput
                {...getInputProps("cae")}
                key={key("cae")}
                label="CAE"
                className="flex-1"
              />
            </div>
          </Stepper.Step>
          <Stepper.Step label="Contato da Empresa">
            <TextInput
              {...getInputProps("responsavel")}
              key={key("responsavel")}
              label="Responsável"
            />
            <div className="flex gap-2">
              <TextInput
                {...getInputProps("telefone")}
                key={key("telefone")}
                label="Telefone"
                className="flex-1"
              />
              <TextInput
                {...getInputProps("email")}
                key={key("email")}
                label="Email"
                className="flex-1"
              />
            </div>
          </Stepper.Step>
          <Stepper.Step label="Desigação no Sistema">
            <TextInput
              {...getInputProps("numero_entidade")}
              key={key("numero_entidade")}
              label="Número Entidade"
              placeholder="Número Entidade"
            />
            <TextInput
              {...getInputProps("desig_ecra")}
              key={key("desig_ecra")}
              label="Designação p/ ecrã"
              placeholder="Nome que irá aparecer no ecrã Multicaixa"
            />
            <TextInput
              {...getInputProps("desig_tecla_seleccao")}
              key={key("desig_tecla_seleccao")}
              label="Designação p/ tecla de selecção"
              placeholder="Nome para a tecla de selecção no Multicaixa"
            />
          </Stepper.Step>
          <Stepper.Completed>
            <ConfirmSection values={values} />
          </Stepper.Completed>
        </Stepper>
      </div>
      <div className="flex w-full px-4 pb-4 pt-2">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Voltar
          </Button>
        )}
        {active !== 3 && (
          <Button onClick={nextStep} className="ml-auto">
            Próximo
          </Button>
        )}
        {active === 3 && (
          <Button
            color="green"
            onClick={handleSubmit}
            loading={isMutating}
            className="ml-auto"
          >
            Finalizar
          </Button>
        )}
      </div>
    </>
  );
}
