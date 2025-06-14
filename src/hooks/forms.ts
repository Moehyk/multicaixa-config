import { zodResolver } from "mantine-form-zod-resolver";

import { useState, useEffect } from "react";
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
  const { setInitialValues, setValues, ...form } = useForm<EmpresaForm>({
    mode: "uncontrolled",
    initialValues: initialEmpresaFormValues,
    validate: zodResolver(empresaSchema),
  });

  useEffect(() => {
    setInitialValues(values);
    setValues(values);
  }, [values]);

  return form;
};

export const useEmpresaModalForm = () => {
  const [active, setActive] = useState(0);

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
  };
};

export const useServicoForm = (values?: ServicoForm) => {
  const { setInitialValues, setValues, ...form } = useForm<ServicoForm>({
    mode: "uncontrolled",
    initialValues: initialServicoFormValues,
    validate: zodResolver(servicoSchema),
  });

  useEffect(() => {
    if (values) {
      setInitialValues(values);
      setValues(values);
    }
  }, [values]);

  return form;
};
