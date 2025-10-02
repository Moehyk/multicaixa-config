"use client";

import { useProdutoCarregamentoForm, useFormMutation } from "@/hooks";
import { CarregamentoFormProvider } from "@/context/forms";

import { CarregamentoForm } from "@/components/forms";

export default function CreateCarregamento({
  servicoId,
}: {
  servicoId: string;
}) {
  const { form, isMutating, handleSubmit } =
    useProdutoCarregamentoForm(servicoId);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <CarregamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
