"use client";

import {
  createProdutoPagamento,
  updateProdutoPagamento,
} from "@/server/services";

import { useEffect } from "react";
import { usePagForm, usePagamentoFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { mcxPreviewStore } from "@/context/mcx/preview-store";
import { zodResolver } from "mantine-form-zod-resolver";
import { openContextModal } from "@mantine/modals";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { produtoPagamentoSchema } from "@/utils/schemas";
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
  }, [values, form]);

  return form;
};

export const useCreatePagamentoForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

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

  return { isMutating, handleSubmit, form };
};

export const useUpdatePagamentoForm = (values: ProdutoPagamentoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

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

  return { isMutating, handleSubmit, form };
};

export const usePagamentoForm = () => {
  const { getInputProps, getValues } = usePagamentoFormContext();

  const handleOpenPreviewModal = () => {
    const values = getValues();

    mcxPreviewStore.setState({
      produto: {
        ...mcxPreviewStore.getState().produto,
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "pagamento",
        pagamento: values.pagamento!,
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

  return { getInputProps, handleOpenPreviewModal };
};
