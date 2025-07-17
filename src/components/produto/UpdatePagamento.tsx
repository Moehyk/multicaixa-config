"use client";
import { updateProdutoPagamento } from "@/server/services";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm, FormCard } from "@/components/forms";

import { useFormMutation, useProdutoPagamentoForm } from "@/hooks";

import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();
  const form = useProdutoPagamentoForm(props);

  const handleSubmit = async (values: ProdutoPagamentoForm) => {
    setIsFetching(true);
    const response = await updateProdutoPagamento(values);
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <FormCard title="Editar Produto Pagamento">
      <PagamentoFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PagamentoForm action="Editar" isSubmitting={isMutating} />
        </form>
      </PagamentoFormProvider>
    </FormCard>
  );
}
