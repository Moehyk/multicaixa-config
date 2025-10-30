"use client";

import { useCreatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context";
import { PagamentoForm, FormActions } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

export default function CreatePagamento({ servicoId }: { servicoId: string }) {
  const { isMutating, handleSubmit, form, handleOpenPreviewModal } =
    useCreatePagamentoForm(servicoId);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12 relative">
        <LoadingOverlay visible={isMutating} />
        <PagamentoForm />
        <FormActions>
          <FormActions.Voltar />
          <FormActions.Visualizar openPreviewModal={handleOpenPreviewModal} />
          <FormActions.Criar />
        </FormActions>
      </form>
    </PagamentoFormProvider>
  );
}
