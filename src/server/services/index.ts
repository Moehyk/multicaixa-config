"use server";

import { api } from "..";

import { Empresa } from "@prisma/client";
import { CreateServicoParams, CreateProdutoParams } from "@/types";

export const upsertEmpresa = async (values: Empresa) => {
  const response = await api.empresa.create(values);

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

export const getServico = async (id: string) => {
  const response = await api.servico.get(id);

  return response;
};

export const getServicos = async (empresaId: string) => {
  const response = await api.servico.getAll(empresaId);

  return response;
};

export const deleteServico = async (id: string) => {
  const response = await api.servico.delete(id);

  return response;
};

export const upsertProduto = async ({
  servicoId,
  input,
}: CreateProdutoParams) => {
  if (input.id) {
    return await api.produto.update(input);
  } else {
    return await api.produto.create(servicoId, input);
  }
};

export const getProduto = async (id: string) => {
  const response = await api.produto.get(id);

  return response;
};

export const getProdutos = async (servicoId: string) => {
  const response = await api.produto.getAll(servicoId);

  return response;
};

export const deleteProduto = async (id: string) => {
  const response = await api.produto.delete(id);

  return response;
};
