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
import { randomId } from "@mantine/hooks";
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
  const {
    getInputProps,
    insertListItem,
    removeListItem,
    getValues,
    setFieldValue,
  } = useCarregamentoFormContext();

  const montanteTipo = getValues().carregamento?.montanteTipo;
  const montantes = getValues().carregamento?.montantes;

  const handleInsertItem = () =>
    insertListItem("carregamento.montantes", {
      descricao: "",
      montante: 0.0,
      key: randomId(),
    });

  const handleRemoveItem = (i: number) =>
    removeListItem(`carregamento.montantes`, i);

  const handleMontanteTipoChange = (e: MontanteTipo) => {
    switch (e) {
      case "montante_livre": {
        setFieldValue("carregamento.montantes", initialCarregamentoMontante);
        break;
      }
      case "montante_pre_definido": {
        setFieldValue("carregamento.montanteMin", 0);
        setFieldValue("carregamento.montanteMax", 0);
        break;
      }
      default:
        break;
    }
    setFieldValue("carregamento.montanteTipo", e as MontanteTipo);
  };

  const handleOpenPreviewModal = () => {
    const values = getValues();

    mcxPreviewStore.setState({
      produto: {
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "carregamentos",
        carregamento: values.carregamento!,
        servicoId: values.servicoId!,
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
    montanteTipo,
    montantes,
    handleMontanteTipoChange,
    handleOpenPreviewModal,
    handleInsertItem,
    handleRemoveItem,
  };
};
