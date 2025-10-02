"use client";

import { useUpdateRecargasForm } from "@/hooks/forms";

import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { form, isMutating, handleSubmit } = useUpdateRecargasForm(props);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <RecargasForm action="Editar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
