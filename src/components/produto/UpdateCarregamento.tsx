"use client";

import { useEffect } from "react";
import { mcxEmpresaStore } from "@/context/mcx";

import { useUpdateCarregamentoForm } from "@/hooks/forms";
import { CarregamentoFormProvider } from "@/context/forms";
import { CarregamentoForm, FormCard } from "@/components/forms";

import type { ProdutoCarregamentoForm } from "@/types";

export default function UpdateCarregamento(props: ProdutoCarregamentoForm) {
  const { isMutating, handleSubmit, form } = useUpdateCarregamentoForm(props);
  const { getServico } = mcxEmpresaStore();

  const servico = getServico(props.servicoId);

  if (!servico) {
    return <div>Ups...</div>;
  }

  useEffect(() => {
    form.setValues({ servicoId: props.servicoId });
  }, [props.servicoId]);

  return (
    <FormCard header={servico.desigEcra} subheader={form.getValues().desigEcra}>
      <CarregamentoFormProvider form={form}>
        <form onSubmit={handleSubmit}>
          <CarregamentoForm action="Editar" isSubmitting={isMutating} />
        </form>
      </CarregamentoFormProvider>
    </FormCard>
  );
}
