import type { Empresa, Servico, Produto } from "@prisma/client";
import type { CarregamentoData, PagamentoData, RecargasData } from "./data";

export type EmpresaForm = Pick<
  Empresa,
  | "cae"
  | "nome"
  | "numeroPessoaColectiva"
  | "sigla"
  | "morada"
  | "localidade"
  | "responsavel"
  | "telefone"
  | "email"
  | "numeroEntidade"
  | "desigEcra"
  | "desigTeclaSeleccao"
  | "utilizadorId"
  | "id"
> &
  Partial<Pick<Empresa, "id">>;

export type ServicoForm = Pick<
  Servico,
  "desigEcra" | "desigTeclaSeleccao" | "desigSistema"
> &
  Partial<Pick<Servico, "id">>;

export type ProdutoForm = Pick<Produto, "desigEcra" | "desigTeclaSeleccao"> &
  Partial<Pick<Produto, "id" | "servicoId">>;

export type ProdutoPagamentoForm = ProdutoForm & {
  pagamento: PagamentoData;
};

export type ProdutoRecargasForm = ProdutoForm & {
  recargas: RecargasData;
};

export type ProdutoCarregamentoForm = ProdutoForm & {
  carregamento: CarregamentoData;
};

export type AllFormTypes =
  | ProdutoCarregamentoForm
  | ProdutoPagamentoForm
  | ProdutoRecargasForm;
