"use client";

import { updateProdutoPagamento } from "@/server/services";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm } from "@/components/forms";

import { useProdutoPagamentoForm } from "@/hooks/forms";

import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { form, isMutating, setIsFetching, back } =
    useProdutoPagamentoForm(props);

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

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <PagamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
