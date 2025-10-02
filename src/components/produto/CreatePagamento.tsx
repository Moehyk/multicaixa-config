"use client";

import { createProdutoPagamento } from "@/server/services";
import { useProdutoPagamentoForm } from "@/hooks";
import { PagamentoFormProvider } from "@/context/forms";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { PagamentoForm } from "@/components/forms";

import { ProdutoPagamentoForm } from "@/types";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, form, back, setIsFetching } = useProdutoPagamentoForm();

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

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <PagamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
