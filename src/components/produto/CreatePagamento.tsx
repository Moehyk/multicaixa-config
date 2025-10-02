"use client";

import { useProdutoPagamentoForm } from "@/hooks";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm } from "@/components/forms";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, handleSubmit, form } = useProdutoPagamentoForm(servicoId);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <PagamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
