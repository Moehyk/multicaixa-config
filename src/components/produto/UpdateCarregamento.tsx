"use client";

import { useUpdateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm } from "@/components/forms";
import { LoadingOverlay } from "@mantine/core";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, handleSubmit, form } = useUpdateCarregamentoForm(props);

  return (
    <CarregamentoFormProvider form={form}>
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={isMutating} />
        <CarregamentoForm action="Editar" />
      </form>
    </CarregamentoFormProvider>
  );
}
