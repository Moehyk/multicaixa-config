"use client";

import { updateProdutoRecargas } from "@/server/services";
import { useProdutoRecargasForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { back, form, isMutating, setIsFetching } =
    useProdutoRecargasForm(props);

  const handleSubmit = form.onSubmit(async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await updateProdutoRecargas(values);
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
      <form onSubmit={handleSubmit}>
        <RecargasForm action="Editar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
