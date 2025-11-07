"use client";

import {
  createProdutoPagamento,
  updateProdutoPagamento,
} from "@/server/services";

import { useEffect } from "react";
import { usePagForm, usePagamentoFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  produtoPagamentoSchema,
  errorNotification,
  sucessNotification,
  openMcxPreviewModal,
} from "@/utils";
import { initialProdutoPagamentoFormValues } from "@/constants/form-values";

import { ProdutoPagamentoForm } from "@/types";

const useForm = (values?: ProdutoPagamentoForm) => {
  const form = usePagForm({
    mode: "uncontrolled",
    initialValues: values ?? initialProdutoPagamentoFormValues,
    validate: zodResolver(produtoPagamentoSchema),
  });

  useEffect(() => {
    if (values) {
      form.setInitialValues(values);
      form.setValues(values);
    }
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return form;
};

export const useCreatePagamentoForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

  const handleOpenPreviewModal = () => openMcxPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(async (values: ProdutoPagamentoForm) => {
    setIsFetching(true);
    const response = await createProdutoPagamento({ ...values, servicoId });
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      back();
    }
  });

  return { isMutating, handleSubmit, form, handleOpenPreviewModal };
};

export const useUpdatePagamentoForm = (values: ProdutoPagamentoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

  const handleOpenPreviewModal = () => openMcxPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(async (values: ProdutoPagamentoForm) => {
    setIsFetching(true);
    const response = await updateProdutoPagamento(values);
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      back();
    }
  });

  return { isMutating, handleSubmit, form, handleOpenPreviewModal };
};

export const usePagamentoForm = () => {
  const { getInputProps } = usePagamentoFormContext();

  return { getInputProps };
};
