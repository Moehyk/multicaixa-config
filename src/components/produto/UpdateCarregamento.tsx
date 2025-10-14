"use client";

import { useEffect } from "react";
import { useUpdateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, handleSubmit, form } = useUpdateCarregamentoForm(props);

  useEffect(() => {
    form.setValues({ servicoId: props.servicoId });
  }, [props.servicoId]);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <CarregamentoForm action="Editar" isSubmitting={isMutating} />
      </form>
    </CarregamentoFormProvider>
  );
}
