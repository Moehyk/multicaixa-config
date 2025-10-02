"use client";

import { createProdutoRecargas } from "@/server/services";
import { useProdutoRecargasForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function CreateRecargas({ servicoId }: { servicoId: string }) {
  const { form, setIsFetching, back, isMutating } = useProdutoRecargasForm();

  const handleSubmit = form.onSubmit(async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await createProdutoRecargas({ ...values, servicoId });
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      back();
    }
  });

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={handleSubmit} className="pt-12">
        <RecargasForm action="Criar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
