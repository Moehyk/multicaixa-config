"use server";

import { empresa } from "../routes/empresa";
import { servico } from "../routes/servico";
import { produto } from "../routes/produto";
import { pagamento } from "../routes/pagamento";

import { Empresa } from "@prisma/client";
import {
  CreateServicoParams,
  CreateProdutoParams,
  ProdutoPagamentoForm,
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

export const upsertProduto = async ({
  servicoId,
  input,
}: CreateProdutoParams) => {
  if (input.id) {
    return await produto.update(input);
  } else {
    return await produto.create(servicoId, input);
  }
};

export const createProdutoPagamento = async (
  servicoId: string,
  input: ProdutoPagamentoForm
) => {
  const produtoResponse = await produto.create(servicoId, {
    desig_ecra: input.desig_ecra,
    desig_tecla_seleccao: input.desig_tecla_seleccao,
    type: "pagamento",
    id: input.id,
  });

  if (!produtoResponse.data) {
    return produtoResponse;
  }

  const pagamentoResponse = await pagamento.create(produtoResponse.data.id, {
    ...input.pagamento,
  });

  return pagamentoResponse;
};

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
