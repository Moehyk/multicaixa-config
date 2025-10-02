"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const useFormMutation = () => {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isPending || isFetching;
  const { push } = useRouter();

  const back = () => startTransition(() => push("/multicaixa"));

  return { isMutating, setIsFetching, startTransition, push, back };
};
