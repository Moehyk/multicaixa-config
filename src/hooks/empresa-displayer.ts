"use client";

import { useEffect, useMemo } from "react";
import { openContextModal } from "@mantine/modals";
import { useLocalStorage } from "@mantine/hooks";

import type { EmpresaData } from "@/types";

export const useEmpresaDisplayer = (data: EmpresaData) => {
  const [_, setEmpresa] = useLocalStorage<string | null>({
    key: "empresa",
    defaultValue: null,
  });

  const empresaNome = useMemo(() => data.desigEcra, [data]);

  useEffect(() => {
    setEmpresa(empresaNome);
  }, [empresaNome, setEmpresa]);

  const openModal = () =>
    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        app: {
          type: "DATA",
          data,
        },
      },
    });

  return {
    openModal,
  };
};
