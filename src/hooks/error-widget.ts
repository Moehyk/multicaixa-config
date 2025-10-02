"use state";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useErrorWidget = (error: Error & { digest?: string }) => {
  const { push } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return () => push("/multicaixa");
};
