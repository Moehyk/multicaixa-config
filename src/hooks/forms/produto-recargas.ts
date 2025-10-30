"use client";

import {
  createProdutoRecargas,
  updateProdutoRecargas,
} from "@/server/services";

import { useEffect } from "react";
import { useRecaForm, useRecargasFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { zodResolver } from "mantine-form-zod-resolver";
import { randomId } from "@mantine/hooks";
import {
  produtoRecargasSchema,
  errorNotification,
  sucessNotification,
  openPreviewModal,
} from "@/utils";
import { initialProdutoRecargasFormValues } from "@/constants/form-values";

import { ProdutoRecargasForm } from "@/types";

const useForm = (values?: ProdutoRecargasForm) => {
  const form = useRecaForm({
    mode: "uncontrolled",
    initialValues: values ?? initialProdutoRecargasFormValues,
    validate: zodResolver(produtoRecargasSchema),
  });

  useEffect(() => {
    if (values) {
      form.setInitialValues(values);
      form.setValues(values);
    }
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return form;
};

export const useCreateRecargasForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

  const handleOpenPreviewModal = () => openPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await createProdutoRecargas({ ...values, servicoId });
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

export const useUpdateRecargasForm = (values: ProdutoRecargasForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

  const handleOpenPreviewModal = () => openPreviewModal(form.getValues);

  const handleSubmit = form.onSubmit(async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await updateProdutoRecargas(values);
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

export const useRecargasForm = () => {
  const { getInputProps, insertListItem, removeListItem, getValues } =
    useRecargasFormContext();

  const montantes = getValues().recargas?.montantes;

  const handleInsertItem = () =>
    insertListItem("recargas.montantes", {
      quantidade: 0,
      montante: 0.0,
      key: randomId(),
    });

  const handleRemoveItem = (i: number) =>
    removeListItem(`recargas.montantes`, i);

  return {
    getInputProps,
    montantes,
    handleInsertItem,
    handleRemoveItem,
  };
};
