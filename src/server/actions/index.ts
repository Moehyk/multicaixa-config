"use server";

import { api } from "..";

import { Empresa } from "@prisma/client";
import { CreateServicoParams } from "@/types";

export const upsertEmpresa = async (values: Empresa) => {
  const response = await api.empresa.create(values);

  return response;
};

export const getServicos = async (empresaId: string) => {
  const response = await api.servico.getAll(empresaId);

  return response;
};

export const getServico = async (id: string) => {
  const response = await api.servico.get(id);

  return response;
};

export const upsertServico = async ({
  empresaId,
  input,
}: CreateServicoParams) => {
  if (input.id) {
    return await api.servico.update(input);
  } else {
    return await api.servico.create(empresaId, input);
  }
};

export const deleteServico = async (id: string) => {
  const response = await api.servico.delete(id);

  return response;
};
