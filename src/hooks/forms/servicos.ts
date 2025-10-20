"use client";

import { upsertServico } from "@/server/services";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useFormMutation } from "./mutation";
import { zodResolver } from "mantine-form-zod-resolver";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { modals } from "@mantine/modals";
import { servicoSchema } from "@/utils/schemas";
import { initialServicoFormValues } from "@/constants/form-values";

import { ServicoForm } from "@/types";

export const useServicoForm = (id: string, values?: ServicoForm) => {
  const { isMutating, setIsFetching, back } = useFormMutation();

  const { setInitialValues, setValues, onSubmit, getInputProps } =
    useForm<ServicoForm>({
      mode: "uncontrolled",
      initialValues: initialServicoFormValues,
      validate: zodResolver(servicoSchema),
    });

  const handleSubmit = onSubmit(async (values: ServicoForm) => {
    setIsFetching(true);

    const response = await upsertServico(id, values);

    setIsFetching(false);
    if (!response.data) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      modals.closeAll();
    }
  });

  useEffect(() => {
    if (values) {
      setInitialValues(values);
      setValues(values);
    }
  }, [values, setInitialValues, setValues]);

  return { isMutating, handleSubmit, getInputProps };
};
