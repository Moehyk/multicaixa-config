"use client";

import {
  createProdutoCarregamento,
  updateProdutoCarregamento,
} from "@/server/services";

import { useEffect } from "react";
import { useCarrForm, useCarregamentoFormContext } from "@/context/forms";
import { useFormMutation } from "./mutation";
import { mcxPreviewStore } from "@/context/mcx/preview-store";
import { zodResolver } from "mantine-form-zod-resolver";
import { openContextModal } from "@mantine/modals";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { produtoCarregamentoSchema } from "@/utils/schemas";
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
  }, [values]);

  return form;
};

export const useCreateCarregamentoForm = (servicoId: string) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm();

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

  return { isMutating, handleSubmit, form };
};

export const useUpdateCarregamentoForm = (values: ProdutoCarregamentoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();
  const form = useForm(values);

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

  return { isMutating, handleSubmit, form };
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

  const handleOpenPreviewModal = () => {
    const values = getValues();

    mcxPreviewStore.setState({
      produto: {
        ...mcxPreviewStore.getState().produto,
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "carregamentos",
        carregamento: values.carregamento!,
      },
    });

    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        app: {
          type: "PREVIEW",
        },
      },
    });
  };

  return {
    getInputProps,
    getValues,
    handleMontanteTipoChange,
    handleOpenPreviewModal,
  };
};
