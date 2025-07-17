"use client";

import { createProdutoPagamento } from "@/server/services";
import { useProdutoPagamentoForm, useFormMutation } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm } from "@/components/forms";

import type { ProdutoPagamentoForm } from "@/types";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();
  const form = useProdutoPagamentoForm();

  const handleSubmit = async (values: ProdutoPagamentoForm) => {
    setIsFetching(true);
    const response = await createProdutoPagamento({ ...values, servicoId });
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)} className="pt-12">
        <PagamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
