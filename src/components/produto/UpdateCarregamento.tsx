"use client";

import { updateProdutoCarregamento } from "@/server/services";
import { useFormMutation, useProdutoCarregamentoForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm, FormCard } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();
  const form = useProdutoCarregamentoForm(props);

  const handleSubmit = async (values: ProdutoCarregamentoForm) => {
    setIsFetching(true);
    const response = await updateProdutoCarregamento(values);
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <FormCard title="Editar Carregamento">
      <CarregamentoFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <CarregamentoForm action="Editar" isSubmitting={isMutating} />
        </form>
      </CarregamentoFormProvider>
    </FormCard>
  );
}
