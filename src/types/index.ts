import type { Dispatch, SetStateAction } from "react";
import type {
  Empresa,
  Servico,
  Produto,
  Pagamento,
  Recargas,
  RecaMontante,
  Carregamento,
  CarrMontante,
  ProdutoTipo,
} from "@prisma/client";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export type EmpresaForm = Omit<Empresa, "servicos">;
export type ServicoForm = Omit<Servico, "produtos" | "empresaId">;
export type ProdutoForm = Omit<
  Produto,
  "servicoId" | "carregamento" | "pagamento" | "recargas" | "id"
>;

export type PagamentoForm = Omit<Pagamento, "produtoId" | "isNew" | "id">;
type PagamentoUpdateForm = Omit<Pagamento, "produtoId" | "isNew">;
export type ProdutoPagamentoForm = ProdutoForm & { pagamento: PagamentoForm };
export type ProdutoPagamentoUpdateForm = ProdutoForm & {
  pagamento: PagamentoUpdateForm;
};

export type RecargasForm = Omit<Recargas, "produtoId" | "id">;
export type RecargaMontantesForm = Omit<RecaMontante, "recargaId" | "id">;
type RecargasUpdateForm = Omit<Recargas, "produtoId">;
type RecargaMontantesUpdateForm = Omit<RecaMontante, "recargaId">;
export type ProdutoRecargasForm = ProdutoForm & {
  recargas: RecargasForm & {
    montantes: RecargaMontantesForm[];
  };
};
export type ProdutoRecargasUpdateForm = ProdutoForm & {
  recargas: RecargasUpdateForm & {
    montantes: RecargaMontantesUpdateForm[];
  };
};

export type CarregamentoForm = Omit<Carregamento, "id" | "produtoId">;
export type CarrMontanteForm = Omit<CarrMontante, "id" | "carregamentoId">;
type CarregamentoUpdateForm = Omit<Carregamento, "produtoId">;
type CarrMontanteUpdateForm = Omit<CarrMontante, "carregamentoId">;

export type ProdutoCarregamentoForm = ProdutoForm & {
  carregamento: CarregamentoForm & {
    montantes: CarrMontanteForm[];
  };
};
export type ProdutoCarregamentoUpdateForm = ProdutoForm & {
  carregamento: CarregamentoUpdateForm & {
    montantes: CarrMontanteUpdateForm[];
  };
};

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
  | "recargas"
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

export type ServicoWithProdutos = Servico & { produtos: Produto[] };

export type Entidade = Empresa & {
  servicos: ServicoWithProdutos[];
};

export type DataModel =
  | "utilizador"
  | "empresa"
  | "servico"
  | "produto"
  | "carregamento"
  | "pagamento"
  | "montante"
  | "recargas";

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
