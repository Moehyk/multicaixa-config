"use client";

import { useEffect } from "react";
import { useUpdatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context/forms";
import { PagamentoForm } from "@/components/forms";

import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { form, isMutating, handleSubmit } = useUpdatePagamentoForm(props);

  useEffect(() => {
    form.setValues({ servicoId: props.servicoId });
  }, [props.servicoId]);

  return (
    <PagamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <PagamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </PagamentoFormProvider>
  );
}
