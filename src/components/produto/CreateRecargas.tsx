"use client";

import { createProdutoRecargas } from "@/server/services";
import { useFormMutation, useProdutoRecargasForm } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { RecargasFormProvider } from "@/context/forms";
import { RecargasForm } from "@/components/forms";

import type { ProdutoRecargasForm } from "@/types";

export default function CreateRecargas({ servicoId }: { servicoId: string }) {
  const { isMutating, setIsFetching, startTransition, push } =
    useFormMutation();

  const form = useProdutoRecargasForm();

  const handleSubmit = async (values: ProdutoRecargasForm) => {
    setIsFetching(true);
    const response = await createProdutoRecargas({ ...values, servicoId });
    setIsFetching(false);

    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      startTransition(() => push("/multicaixa"));
    }
  };

  return (
    <RecargasFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)} className="pt-12">
        <RecargasForm action="Criar" isSubmitting={isMutating} />
      </form>
    </RecargasFormProvider>
  );
}
