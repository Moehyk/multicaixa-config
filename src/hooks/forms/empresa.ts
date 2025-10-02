"use client";

import { useEffect, useState } from "react";
import { upsertEmpresa } from "@/server/services";
import { useForm } from "@mantine/form";
import { useFormMutation } from "./mutation";
import { zodResolver } from "mantine-form-zod-resolver";
import { modals } from "@mantine/modals";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import {
  empresaSchema,
  empresaStepOneSchema,
  empresaStepTwoSchema,
  empresaStepThreeSchema,
} from "@/utils/schemas";
import { initialEmpresaFormValues } from "@/constants/form-values";

import { EmpresaForm } from "@/types";
import { get } from "http";

export const useEmpresaForm = (values: EmpresaForm) => {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const { setInitialValues, setValues, getInputProps, onSubmit } =
    useForm<EmpresaForm>({
      mode: "uncontrolled",
      initialValues: initialEmpresaFormValues,
      validate: zodResolver(empresaSchema),
    });

  const handleSubmit = onSubmit(async (values: EmpresaForm) => {
    setIsFetching(true);
    const response = await upsertEmpresa(values);
    setIsFetching(false);

    if (response.status !== 200) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  });

  useEffect(() => {
    setInitialValues(values);
    setValues(values);
  }, [values]);

  return { getInputProps, handleSubmit, isMutating };
};

export const useEmpresaModalForm = () => {
  const { isMutating, setIsFetching } = useFormMutation();
  const [active, setActive] = useState(0);

  const nextStep = () => {
    setActive((current) => {
      if (validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { getInputProps, values, key, validate } = useForm<EmpresaForm>({
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

  return {
    active,
    nextStep,
    prevStep,
    isMutating,
    getInputProps,
    key,
    handleSubmit,
    values,
  };
};
