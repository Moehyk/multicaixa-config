"use client";

import { useUpdateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm, FormActions } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, handleSubmit, form, handleOpenPreviewModal } =
    useUpdateCarregamentoForm(props);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={isMutating} />
        <CarregamentoForm />
        <FormActions>
          <FormActions.Voltar />
          <FormActions.Visualizar openPreviewModal={handleOpenPreviewModal} />
          <FormActions.Editar />
        </FormActions>
      </form>
    </CarregamentoFormProvider>
  );
}
