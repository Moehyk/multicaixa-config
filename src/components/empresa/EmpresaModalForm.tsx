"use client";

import { useEmpresaModalForm } from "@/hooks/useEmpresaForm";

import { Stepper, TextInput, Button } from "@mantine/core";

export default function EmpresaModalForm() {
  const {
    active,
    nextStep,
    prevStep,
    form: { getInputProps, getValues },
  } = useEmpresaModalForm();

  return (
    <div className="p-2">
      <Stepper active={active} className="h-88">
        <Stepper.Step label="Dados da Empresa">
          <div className="flex gap-2">
            <TextInput
              {...getInputProps("nome")}
              label="Nome"
              className="flex-1"
            />
            <TextInput {...getInputProps("sigla")} label="Sigla" />
          </div>
          <div className="flex gap-2">
            <TextInput
              {...getInputProps("morada")}
              label="Morada"
              className="flex-1"
            />
            <TextInput {...getInputProps("localidade")} label="Localidade" />
          </div>
          <div className="flex gap-2">
            <TextInput
              {...getInputProps("numero_pessoa_colectiva")}
              label="Número Pessoa Colectiva"
              className="flex-1"
            />
            <TextInput
              {...getInputProps("cae")}
              label="CAE"
              className="flex-1"
            />
          </div>
        </Stepper.Step>
        <Stepper.Step label="Contato da Empresa">
          <TextInput {...getInputProps("responsavel")} label="Responsável" />
          <div className="flex gap-2">
            <TextInput
              {...getInputProps("telefone")}
              label="Telefone"
              className="flex-1"
            />
            <TextInput
              {...getInputProps("email")}
              label="Email"
              className="flex-1"
            />
          </div>
        </Stepper.Step>
        <Stepper.Step label="Desigação no Sistema">
          <TextInput
            {...getInputProps("numero_entidade")}
            label="Número Entidade"
            placeholder="Número Entidade"
          />
          <TextInput
            {...getInputProps("desig_ecra")}
            label="Designação p/ ecrã"
            placeholder="Nome que irá aparecer no ecrã Multicaixa"
          />
          <TextInput
            {...getInputProps("desig_tecla_seleccao")}
            label="Designação p/ tecla de selecção"
            placeholder="Nome para a tecla de selecção no Multicaixa"
          />
        </Stepper.Step>
        <Stepper.Completed>
          Form Values: {JSON.stringify(getValues())}
        </Stepper.Completed>
      </Stepper>
      <div className="flex w-full mt-4">
        {active !== 0 && <Button onClick={prevStep}>Voltar</Button>}
        {active !== 3 && (
          <Button onClick={nextStep} className="ml-auto">
            Próximo
          </Button>
        )}
        {active === 3 && (
          <Button onClick={() => {}} className="ml-auto">
            Finalizar
          </Button>
        )}
      </div>
    </div>
  );
}
