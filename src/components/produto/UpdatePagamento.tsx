"use client";

import { useUpdatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context/forms";
import { PagamentoForm } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { form, isMutating, handleSubmit } = useUpdatePagamentoForm(props);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={isMutating} />
        <PagamentoForm action="Editar" />
      </form>
    </PagamentoFormProvider>
  );
}
