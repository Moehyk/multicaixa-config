"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

export const initEmpresa = async () => {
  let empresaExist = false;

  // Check if empresa exists
  const { status, data: empresa } = await api.empresa.get();

  if (status === 200) {
    empresaExist = true;
  }

  return { empresaExist, empresa };
};
