"use server";

import { empresa } from "../routes/empresa";
import { servico } from "../routes/servico";
import { produto } from "../routes/produto";

import { Empresa } from "@prisma/client";
import {
  CreateServicoParams,
  ProdutoPagamentoForm,
  ProdutoPagamentoUpdateForm,
  ProdutoRecargasForm,
  ProdutoRecargasUpdateForm,
  ProdutoCarregamentoForm,
  ProdutoCarregamentoUpdateForm,
} from "@/types";

export const upsertEmpresa = async (values: Empresa) => {
  const response = await empresa.create(values);

  return response;
};

export const getEmpresa = async () => {
  const response = await empresa.get();

  return response;
};

export const upsertServico = async ({
  empresaId,
  input,
}: CreateServicoParams) => {
  if (input.id) {
    return await servico.update(input);
  } else {
    return await servico.create(empresaId, input);
  }
};

export const getServico = async (id: string) => {
  const response = await servico.get(id);

  return response;
};

export const getServicos = async (empresaId: string) => {
  const response = await servico.getAll(empresaId);

  return response;
};

export const deleteServico = async (id: string) => {
  const response = await servico.delete(id);

  return response;
};

export const createProdutoPagamento = async (
  servicoId: string,
  input: ProdutoPagamentoForm
) => await produto.pagamento.create(servicoId, input);

export const updateProdutoPagamento = async (
  id: string,
  input: ProdutoPagamentoUpdateForm
) => await produto.pagamento.update(id, input);

export const createProdutoRecargas = async (
  servicoId: string,
  input: ProdutoRecargasForm
) => await produto.recargas.create(servicoId, input);

export const updateProdutoRecargas = async (
  id: string,
  input: ProdutoRecargasUpdateForm
) => await produto.recargas.update(id, input);

export const createProdutoCarregamento = async (
  servicoId: string,
  input: ProdutoCarregamentoForm
) => await produto.carregamento.create(servicoId, input);

export const updateProdutoCarregamento = async (
  id: string,
  input: ProdutoCarregamentoUpdateForm
) => await produto.carregamento.update(id, input);

export const getProduto = async (id: string) => {
  const response = await produto.get(id);

  return response;
};

export const getProdutos = async (servicoId: string) => {
  const response = await produto.getAll(servicoId);

  return response;
};

export const deleteProduto = async (id: string) => {
  const response = await produto.delete(id);

  return response;
};
