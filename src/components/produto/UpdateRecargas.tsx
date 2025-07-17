"use client";

import { updateProdutoRecargas } from "@/server/services";
import { useFormMutation, useProdutoRecargasForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm, FormCard } from "@/components/forms";

import type { Produto, Recargas, RecaMontante } from "@prisma/client";
import type { ProdutoRecargasForm } from "@/types";

export default function UpdateRecargas(props: ProdutoRecargasForm) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const form = useProdutoRecargasForm(props);

  const handleSubmit = async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await updateProdutoRecargas(values);
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };
  return (
    <FormCard title="Editar Produto Recargas">
      <RecargasFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <RecargasForm action="Editar" isSubmitting={isMutating} />
        </form>
      </RecargasFormProvider>
    </FormCard>
  );
}
