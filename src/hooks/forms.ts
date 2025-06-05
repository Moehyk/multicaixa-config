import { zodResolver } from "mantine-form-zod-resolver";

import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import {
  empresaSchema,
  empresaStepOneSchema,
  empresaStepTwoSchema,
  empresaStepThreeSchema,
  servicoSchema,
} from "@/utils/schemas";

import {
  initialEmpresaFormValues,
  initialServicoFormValues,
} from "@/constants/form-values";

import { EmpresaForm, ServicoForm } from "@/types";

export const useEmpresaForm = (values: EmpresaForm) => {
  const form = useForm<EmpresaForm>({
    mode: "uncontrolled",
    initialValues: initialEmpresaFormValues,
    validate: zodResolver(empresaSchema),
  });

  useEffect(() => {
    form.setInitialValues(values);
    form.setValues(values);
  }, [values, form]);

  return form;
};

export const useEmpresaModalForm = () => {
  const [active, setActive] = useState(0);
  const [opened, { close }] = useDisclosure(true);

  const form = useForm<EmpresaForm>({
    mode: "controlled",
    initialValues: initialEmpresaFormValues,
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

export const useServicoForm = (values?: ServicoForm) => {
  const form = useForm<ServicoForm>({
    mode: "uncontrolled",
    initialValues: initialServicoFormValues,
    validate: zodResolver(servicoSchema),
  });

  useEffect(() => {
    if (values) {
      form.setInitialValues(values);
      form.setValues(values);
    }
  }, [values, form]);

  return form;
};
