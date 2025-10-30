"use client";

import { useCreateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm, FormActions } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

export default function CreateCarregamento({
  servicoId,
}: {
  servicoId: string;
}) {
  const { form, isMutating, handleSubmit, handleOpenPreviewModal } =
    useCreateCarregamentoForm(servicoId);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12 relative">
        <LoadingOverlay visible={isMutating} />
        <CarregamentoForm />
        <FormActions>
          <FormActions.Voltar />
          <FormActions.Visualizar openPreviewModal={handleOpenPreviewModal} />
          <FormActions.Criar />
        </FormActions>
      </form>
    </CarregamentoFormProvider>
  );
}
