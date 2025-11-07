"use client";

import {
  createProdutoCarregamento,
  updateProdutoCarregamento,
} from "@/server/services";

import { useEffect } from "react";
import { useCarrForm, useCarregamentoFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  produtoCarregamentoSchema,
  errorNotification,
  sucessNotification,
  openMcxPreviewModal,
} from "@/utils";
import {
  initialProdutoCarregamentoFormValues,
  initialCarregamentoMontante,
} from "@/constants/form-values";

import type { MontanteTipo } from "@prisma/client";
import { ProdutoCarregamentoForm } from "@/types";

const useForm = (values?: ProdutoCarregamentoForm) => {
  const form = useCarrForm({
    mode: "uncontrolled",
    initialValues: values ?? initialProdutoCarregamentoFormValues,
    validate: zodResolver(produtoCarregamentoSchema),
  });

  useEffect(() => {
    if (values) {
      form.setInitialValues(values);
      form.setValues(values);
    }
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return form;
};

export const useCreateCarregamentoForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

  const handleOpenPreviewModal = () => openMcxPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(
    async (values: ProdutoCarregamentoForm) => {
      setIsFetching(true);
      const response = await createProdutoCarregamento({
        ...values,
        servicoId,
      });
      setIsFetching(false);

      if (!response.data) {
        errorNotification(response);
      } else {
        sucessNotification(response);
        back();
      }
    }
  );

  return { isMutating, handleSubmit, form, handleOpenPreviewModal };
};

export const useUpdateCarregamentoForm = (values: ProdutoCarregamentoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

  const handleOpenPreviewModal = () => openMcxPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(
    async (values: ProdutoCarregamentoForm) => {
      setIsFetching(true);
      const response = await updateProdutoCarregamento(values);
      setIsFetching(false);

      if (!response.data) {
        errorNotification(response);
      } else {
        sucessNotification(response);
        back();
      }
    }
  );

  return { isMutating, handleSubmit, form, handleOpenPreviewModal };
};

export const useCarregamentoForm = () => {
  const { getInputProps, getValues, setFieldValue } =
    useCarregamentoFormContext();

  const resetToInitialValues = () => {
    setFieldValue("carregamento.montantes", initialCarregamentoMontante);
    setFieldValue("carregamento.montanteMin", 0);
    setFieldValue("carregamento.montanteMax", 0);
  };

  const handleMontanteTipoChange = (e: MontanteTipo) => {
    resetToInitialValues();
    setFieldValue("carregamento.montanteTipo", e as MontanteTipo);
  };

  return {
    getInputProps,
    getValues,
    handleMontanteTipoChange,
  };
};
