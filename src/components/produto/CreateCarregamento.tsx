"use client";

import { createProdutoCarregamento } from "@/server/services";
import { useProdutoCarregamentoForm, useFormMutation } from "@/hooks";
import { CarregamentoFormProvider } from "@/context/forms";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { CarregamentoForm } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function CreateCarregamento({
  servicoId,
}: {
  servicoId: string;
}) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const form = useProdutoCarregamentoForm();

  const handleSubmit = async (values: ProdutoCarregamentoForm) => {
    const input: ProdutoCarregamentoForm = {
      ...values,
      servicoId,
    };

    if (values.carregamento.montante_tipo === "montante_livre") {
      input.carregamento.montantes = [];
    }

    if (values.carregamento.montante_tipo === "montante_pre_definido") {
      input.carregamento.montante_maximo = undefined;
      input.carregamento.montante_minimo = undefined;
    }

    setIsFetching(true);
    const response = await createProdutoCarregamento({ ...values, servicoId });
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)} className="pt-12">
        <CarregamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
