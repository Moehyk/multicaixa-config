"use client";

import { useCreatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context";
import { PagamentoForm } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, handleSubmit, form } = useCreatePagamentoForm(servicoId);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12 relative">
        <LoadingOverlay visible={isMutating} />
        <PagamentoForm action="Criar" />
      </form>
    </PagamentoFormProvider>
  );
}
