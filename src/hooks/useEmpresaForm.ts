import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  empresaSchema,
  empresaStepOneSchema,
  empresaStepTwoSchema,
  empresaStepThreeSchema,
} from "@/utils/schemas";
import { EmpresaForm } from "@/types";
import { Empresa } from "@prisma/client";

const initialValues: Empresa = {
  id: "",
  utilizadorId: "",
  nome: "",
  sigla: "",
  morada: "",
  localidade: "",
  responsavel: "",
  telefone: "",
  email: "",
  cae: "",
  numero_pessoa_colectiva: "",
  numero_entidade: "",
  desig_ecra: "",
  desig_tecla_seleccao: "",
};

export const useEmpresaForm = (data: Empresa) => {
  const form = useForm<Empresa>({
    mode: "uncontrolled",
    initialValues,
    validate: zodResolver(empresaSchema),
  });

  useEffect(() => {
    form.setInitialValues(data);
    form.setValues(data);
  }, [data]);

  return form;
};

export const useEmpresaModalForm = () => {
  const [active, setActive] = useState(0);
  const [opened, { close }] = useDisclosure(true);

  const form = useForm<Empresa>({
    mode: "controlled",
    initialValues,
    validate: zodResolver(
      active === 0
        ? empresaStepOneSchema
        : active === 1
        ? empresaStepTwoSchema
        : empresaStepThreeSchema
    ),
  });

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return {
    active,
    form,
    nextStep,
    prevStep,
    opened,
    close,
  };
};
