"use client";

import { useCreateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

export default function CreateRecargas({ servicoId }: { servicoId: string }) {
  const { form, handleSubmit, isMutating } = useCreateRecargasForm(servicoId);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <RecargasForm action="Criar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
