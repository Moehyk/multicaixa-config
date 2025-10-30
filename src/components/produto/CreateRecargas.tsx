"use client";

import { useCreateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm, FormActions } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

export default function CreateRecargas({ servicoId }: { servicoId: string }) {
  const { form, handleSubmit, isMutating, handleOpenPreviewModal } =
    useCreateRecargasForm(servicoId);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12 relative">
        <LoadingOverlay visible={isMutating} />
        <RecargasForm />
        <FormActions>
          <FormActions.Voltar />
          <FormActions.Visualizar openPreviewModal={handleOpenPreviewModal} />
          <FormActions.Criar />
        </FormActions>
      </form>
    </RecargasFormProvider>
  );
}
