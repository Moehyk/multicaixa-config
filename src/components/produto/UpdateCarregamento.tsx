"use client";

import { updateProdutoCarregamento } from "@/server/services";
import { useProdutoCarregamentoForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, back, setIsFetching, form } =
    useProdutoCarregamentoForm(props);

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

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <CarregamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
