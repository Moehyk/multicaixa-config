"use server";

import { api } from "..";
import { EmpresaForm } from "@/types";

export const updateEmpresa = async (
  values: EmpresaForm,
  id: string | undefined
) => {
  const response = await api.empresa.create(values, id);

  return response;
};

export const getEmpresa = async () => {
  const response = await api.empresa.get();

  return response;
};
