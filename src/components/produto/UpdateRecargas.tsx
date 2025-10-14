"use client";

import { useEffect } from "react";
import { useUpdateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { form, isMutating, handleSubmit } = useUpdateRecargasForm(props);

  useEffect(() => {
    form.setValues({ servicoId: props.servicoId });
  }, [props.servicoId]);

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <RecargasForm action="Editar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
