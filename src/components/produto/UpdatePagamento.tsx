"use client";
import { updateProdutoPagamento } from "@/server/services";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm } from "@/components/forms";
import { CardTitle } from "@/components";
import { Card } from "@mantine/core";

import { useFormMutation, useProdutoPagamentoForm } from "@/hooks";

import type { Produto, Pagamento } from "@prisma/client";
import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento({
  produto,
  pagamento,
}: {
  produto: Produto;
  pagamento: Pagamento;
}) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();
  const form = useProdutoPagamentoForm({
    ...produto,
    pagamento,
  });

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
    <Card withBorder p={32}>
      <CardTitle title="Editar Produto Pagamento" />
      <PagamentoFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PagamentoForm action="Editar" isSubmitting={isMutating} />
        </form>
      </PagamentoFormProvider>
    </Card>
  );
}
