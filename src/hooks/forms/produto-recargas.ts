"use client";

import {
  createProdutoRecargas,
  updateProdutoRecargas,
} from "@/server/services";

import { useEffect } from "react";
import { useRecaForm, useRecargasFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { mcxPreviewStore } from "@/context/mcx/preview-store";
import { zodResolver } from "mantine-form-zod-resolver";
import { openContextModal } from "@mantine/modals";
import { randomId } from "@mantine/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { produtoRecargasSchema } from "@/utils/schemas";
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
  }, [values, form]);

  return form;
};

export const useCreateRecargasForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

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

  return { isMutating, handleSubmit, form };
};

export const useUpdateRecargasForm = (values: ProdutoRecargasForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

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

  return { isMutating, handleSubmit, form };
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

  const handleOpenPreviewModal = () => {
    const values = getValues();

    mcxPreviewStore.setState({
      produto: {
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "recargas",
        recargas: values.recargas!,
      },
    });

    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        type: "PREVIEW",
      },
    });
  };

  return {
    getInputProps,
    montantes,
    handleInsertItem,
    handleRemoveItem,
    handleOpenPreviewModal,
  };
};
