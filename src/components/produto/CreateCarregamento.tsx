"use client";

import { useCreateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";

import { CarregamentoForm } from "@/components/forms";

export default function CreateCarregamento({
  servicoId,
}: {
  servicoId: string;
}) {
  const { form, isMutating, handleSubmit } =
    useCreateCarregamentoForm(servicoId);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <CarregamentoForm action="Criar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
