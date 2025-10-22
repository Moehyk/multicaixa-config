"use client";

import { useUpdateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm, FormCard } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, handleSubmit, form } = useUpdateCarregamentoForm(props);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <CarregamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
