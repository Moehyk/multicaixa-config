"use client";

import { useEffect } from "react";
import { useCreatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context";
import { PagamentoForm } from "@/components/forms";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, handleSubmit, form } = useCreatePagamentoForm(servicoId);

  useEffect(() => {
    form.setValues({ servicoId });
  }, [servicoId, form]);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <PagamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
