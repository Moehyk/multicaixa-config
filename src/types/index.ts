import type { Dispatch, SetStateAction } from "react";
import {
  Empresa,
  Servico,
  Produto,
  Pagamento,
  Carregamento,
  Recarga,
  Recargas,
  Montante,
  ProdutoTipo,
} from "@prisma/client";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export type EmpresaForm = Omit<Empresa, "servicos">;
export type ServicoForm = Omit<Servico, "produtos" | "empresaId">;
export type ProdutoForm = Omit<
  Produto,
  "servicoId" | "carregamento" | "pagamento" | "recargas"
>;
export type PagamentoForm = Omit<Pagamento, "produtoId" | "isNew">;
export type CarregamentoForm = Omit<Carregamento, "id" | "productId">;

export type ProdutoPagamentoForm = ProdutoForm & { pagamento: PagamentoForm };

export type GridButton = {
  id: string;
  screenText: string;
  subtitle?: string;
  selectText: string;
  selectSecondarytext?: string;
  produtoTipo?: ProdutoTipo;
};

export type Views =
  | "empresa"
  | "servico"
  | "recarga"
  | "produto"
  | "carregamento"
  | "pagamento"
  | "montante"
  | "end";

export type GroupButtons = {
  buttons: GridButton[];
  currentPage: number;
  dispatch: Dispatch<SetStateAction<number>>;
  lastPage?: number;
  to: (id: string, targetView?: ProdutoTipo) => void;
};

export type CreateServicoParams = {
  input: ServicoForm;
  empresaId: string;
};

export type CreateProdutoParams = {
  input: ProdutoForm;
  servicoId: string;
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

export type ServicoWithProdutos = Servico & { produtos: ProdutoType[] };

export type Entidade = Empresa & {
  servicos: ServicoWithProdutos[];
};

export type DataModel =
  | "utilizador"
  | "empresa"
  | "servico"
  | "produto"
  | "carregamento"
  | "montante"
  | "recarga";

export type BaseApiResponse = {
  status: number;
  message: string;
  data?: unknown;
  error?: unknown;
};

export type DeleteHandler<T extends BaseApiResponse = BaseApiResponse> = (
  id: string
) => Promise<T>;

export type ValidationParams = {
  cuid: boolean;
  user: KindeUser<Record<string, any>>;
  data: DataModel;
  inputs: boolean;
  message?: string;
};
