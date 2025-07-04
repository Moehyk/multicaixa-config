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
  MontanteTipo,
} from "@prisma/client";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export type EmpresaForm = Omit<Empresa, "servicos">;
export type ServicoForm = Omit<Servico, "produtos" | "empresaId">;
export type ProdutoForm = {
  id?: string;
  servicoId?: string;
  desig_ecra: string;
  desig_tecla_seleccao: string;
};

export type ProdutoPagamentoForm = ProdutoForm & {
  pagamento: {
    id?: string;
    produtoId?: string;
    desig_referencia: string;
    tamanho_referencia: number;
    texto_ecra_referencia: string;
    isNew: boolean;
    montante_minimo: number;
    montante_maximo: number;
  };
};

export type ProdutoRecargasForm = ProdutoForm & {
  recargas: {
    id?: string;
    produtoId?: string;
    desig_unidade: string;
    montantes: {
      id: string;
      recargaId?: string;
      montante: number;
      quantidade: number;
      key: string;
    }[];
  };
};

export type ProdutoCarregamentoForm = ProdutoForm & {
  carregamento: {
    id?: string;
    produtoId?: string;
    desig_referencia: string;
    tamanho_referencia: number;
    texto_ecra_referencia: string;
    montante_tipo: MontanteTipo;
    montante_maximo?: number;
    montante_minimo?: number;
    montantes: {
      id: string;
      carregamentoId?: string;
      montante: number;
      descricao: string;
      key: string;
    }[];
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
