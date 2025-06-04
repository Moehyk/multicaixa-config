import {
  Empresa,
  Servico,
  Produto,
  Pagamento,
  Carregamento,
  Recarga,
  Recargas,
  Montante,
} from "@prisma/client";

export type EmpresaForm = Omit<Empresa, "servicos">;
export type ServicoForm = Omit<Servico, "id" | "empresaId">;
export type ProdutoForm = Omit<Produto, "id" | "serviceId">;
export type PagamentoForm = Omit<Pagamento, "id" | "productId" | "isNew">;
export type CarregamentoForm = Omit<Carregamento, "id" | "productId">;

export type GridButton = {
  id: string;
  text: string;
};

export type CreateServicoParams = {
  input: ServicoForm;
  empresaId: string;
  id: string | undefined;
};

export type CreateProdutoParams = {
  input: ProdutoForm;
  serviceId: string;
  id: string | undefined;
};

export type CreatePagamentoParams = {
  input: PagamentoForm;
  productId: string;
  id: string | undefined;
};

export type CreateCarregamentoParams = {
  input: CarregamentoForm;
  productId: string;
  id: string | undefined;
};

export type UrlParams = {
  eid: string;
  pid: string;
  sid: string;
};

type ProdutoBase = Omit<Produto, "type">;

type ProdutoPagamento = ProdutoBase & {
  type: "pagamento";
  pagamento: Pagamento;
};

type ProdutoCarregamento = ProdutoBase & {
  type: "carregamentos";
  carregamento: Carregamento & { montantes: Montante[] };
};

type ProdutoRecarga = ProdutoBase & {
  type: "recargas";
  recargas: Recargas & { recargas: Recarga[] };
};

type ProdutoType = ProdutoPagamento | ProdutoCarregamento | ProdutoRecarga;

type ServicoWithProdutos = Servico & { produtos: ProdutoType[] };

export type Entidade = Empresa & {
  servicos: ServicoWithProdutos[];
};
