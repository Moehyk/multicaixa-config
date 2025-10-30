"use client";

import { useUpdateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm, FormActions } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { form, isMutating, handleSubmit, handleOpenPreviewModal } =
    useUpdateRecargasForm(props);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={isMutating} />
        <RecargasForm />
        <FormActions>
          <FormActions.Voltar />
          <FormActions.Visualizar openPreviewModal={handleOpenPreviewModal} />
          <FormActions.Editar />
        </FormActions>
      </form>
    </RecargasFormProvider>
  );
}
