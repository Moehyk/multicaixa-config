"use client";

import { useSearchParams } from "next/navigation";
import { useUpdatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context/forms";
import { PagamentoForm, FormCard } from "@/components/forms";

import type { ProdutoPagamentoForm, ProdutoData } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { form, isMutating, handleSubmit } = useUpdatePagamentoForm(props);
  const servico = useSearchParams().get("servico");

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <PagamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
