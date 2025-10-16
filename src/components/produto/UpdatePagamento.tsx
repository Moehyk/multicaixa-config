"use client";

import { useEffect } from "react";
import { mcxEmpresaStore } from "@/context/mcx";

import { useUpdatePagamentoForm } from "@/hooks/forms";
import { PagamentoFormProvider } from "@/context/forms";
import { PagamentoForm, FormCard } from "@/components/forms";

import type { ProdutoPagamentoForm } from "@/types";

export default function UpdatePagamento(props: ProdutoPagamentoForm) {
  const { form, isMutating, handleSubmit } = useUpdatePagamentoForm(props);
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
      <PagamentoFormProvider form={form}>
        <form onSubmit={handleSubmit}>
          <PagamentoForm action="Editar" isSubmitting={isMutating} />
        </form>
      </PagamentoFormProvider>
    </FormCard>
  );
}
