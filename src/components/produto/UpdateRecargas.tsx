"use client";

import { useUpdateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { form, isMutating, handleSubmit } = useUpdateRecargasForm(props);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={isMutating} />
        <RecargasForm action="Editar" />
      </form>
    </RecargasFormProvider>
  );
}
