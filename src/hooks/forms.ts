"use client";

import { upsertEmpresa, upsertServico } from "@/server/services";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { usePagForm, useCarrForm, useRecaForm } from "@/context/forms";
import { zodResolver } from "mantine-form-zod-resolver";
import { modals } from "@mantine/modals";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import {
  empresaSchema,
  empresaStepOneSchema,
  empresaStepTwoSchema,
  empresaStepThreeSchema,
  servicoSchema,
  produtoPagamentoSchema,
  produtoRecargasSchema,
  produtoCarregamentoSchema,
} from "@/utils/schemas";

import {
  initialEmpresaFormValues,
  initialServicoFormValues,
  initialProdutoPagamentoFormValues,
  initialProdutoRecargasFormValues,
  initialProdutoCarregamentoFormValues,
} from "@/constants/form-values";

import {
  EmpresaForm,
  ServicoForm,
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
} from "@/types";

const useFormMutation = () => {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isPending || isFetching;
  const { push } = useRouter();

  const back = () => startTransition(() => push("/multicaixa"));

  return { isMutating, setIsFetching, startTransition, push, back };
};

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

export const useServicoForm = (id: string, values?: ServicoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();

  const { setInitialValues, setValues, onSubmit, getInputProps } =
    useForm<ServicoForm>({
      mode: "uncontrolled",
      initialValues: initialServicoFormValues,
      validate: zodResolver(servicoSchema),
    });

  const handleSubmit = onSubmit(async (values: ServicoForm) => {
    setIsFetching(true);

    const response = await upsertServico(id, values);

    setIsFetching(false);
    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      modals.closeAll();
    }
  });

  useEffect(() => {
    if (values) {
      setInitialValues(values);
      setValues(values);
    }
  }, [values]);

  return { isMutating, handleSubmit, getInputProps };
};

export const useProdutoPagamentoForm = (values?: ProdutoPagamentoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();

  const form = usePagForm({
    mode: "uncontrolled",
    initialValues: values ?? initialProdutoPagamentoFormValues,
    validate: zodResolver(produtoPagamentoSchema),
  });

  useEffect(() => {
    if (values) {
      form.initialize(values);
    }
  }, [values]);

  return { isMutating, form, setIsFetching, back };
};

export const useProdutoCarregamentoForm = (
  values?: ProdutoCarregamentoForm
) => {
  const { isMutating, setIsFetching, back } = useFormMutation();

  const form = useCarrForm({
    mode: "uncontrolled",
    initialValues: values ?? initialProdutoCarregamentoFormValues,
    validate: zodResolver(produtoCarregamentoSchema),
  });

  useEffect(() => {
    if (values) {
      form.initialize(values);
    }
  }, [values]);

  return { isMutating, form, setIsFetching, back };
};

export const useProdutoRecargasForm = (values?: ProdutoRecargasForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();

  const form = useRecaForm({
    mode: "controlled",
    initialValues: values ?? initialProdutoRecargasFormValues,
    validate: zodResolver(produtoRecargasSchema),
  });

  useEffect(() => {
    if (values) {
      form.initialize(values);
    }
  }, [values]);

  return { isMutating, setIsFetching, back, form };
};
