"use server";

import { empresa } from "../routes/empresa";
import { servico } from "../routes/servico";
import { produto } from "../routes/produto";

import {
  EmpresaForm,
  ServicoForm,
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
} from "@/types";

export const upsertEmpresa = async (values: EmpresaForm) => {
  const response = await empresa.create(values);

  return response;
};

export const getEmpresa = async () => {
  const response = await empresa.get();

  return response;
};

export const upsertServico = async (input: ServicoForm) => {
  if (input.id) {
    return await servico.update(input);
  } else {
    return await servico.create(input);
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

export const createProdutoPagamento = async (input: ProdutoPagamentoForm) =>
  await produto.pagamento.create(input);

export const updateProdutoPagamento = async (input: ProdutoPagamentoForm) =>
  await produto.pagamento.update(input);

export const createProdutoRecargas = async (input: ProdutoRecargasForm) =>
  await produto.recargas.create(input);

export const updateProdutoRecargas = async (input: ProdutoRecargasForm) =>
  await produto.recargas.update(input);

export const createProdutoCarregamento = async (
  input: ProdutoCarregamentoForm
) => await produto.carregamento.create(input);

export const updateProdutoCarregamento = async (
  input: ProdutoCarregamentoForm
) => await produto.carregamento.update(input);

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
