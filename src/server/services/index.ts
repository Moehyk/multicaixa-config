"use server";

import { api } from "..";

import { Empresa } from "@prisma/client";
import { ServicoForm } from "@/types";

export const updateEmpresa = async (values: Empresa) => {
  const response = await api.empresa.create(values);

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

export const createEmpresa = async (values: Empresa) => {
  const response = await api.empresa.create(values);

  return response;
};

export const createServico = async (empresaId: string, values: ServicoForm) => {
  const response = await api.servico.create({ ...values, empresaId });

  return response;
};
