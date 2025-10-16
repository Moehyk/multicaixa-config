"use client";

import { useEffect } from "react";
import { mcxEmpresaStore } from "@/context/mcx";

import { useUpdateRecargasForm } from "@/hooks/forms";
import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm, FormCard } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { form, isMutating, handleSubmit } = useUpdateRecargasForm(props);
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
      <RecargasFormProvider form={form}>
        <form onSubmit={handleSubmit}>
          <RecargasForm action="Editar" isSubmitting={isMutating} />
        </form>
      </RecargasFormProvider>
    </FormCard>
  );
}
