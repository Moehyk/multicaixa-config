"use client";

import { useCreatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context/forms";

import { PagamentoForm } from "@/components/forms";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, handleSubmit, form } = useCreatePagamentoForm(servicoId);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <PagamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
