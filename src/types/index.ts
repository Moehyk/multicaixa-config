import type { Dispatch, SetStateAction } from "react";
import type {
  Empresa,
  Servico,
  Produto,
  ProdutoTipo,
  MontanteTipo,
} from "@prisma/client";

export type EmpresaForm = {
  id?: string;
  utilizadorId: string;
  cae: string;
  nome: string;
  numeroPessoaColectiva: string;
  sigla: string;
  morada: string;
  localidade: string;
  responsavel: string;
  telefone: string;
  email: string;
  numeroEntidade: string;
  desigEcra: string;
  desigTeclaSeleccao: string;
};

export type ServicoForm = {
  id?: string;
  desigEcra: string;
  desigTeclaSeleccao: string;
  desigSistema: string;
};

export type ProdutoForm = {
  id?: string;
  servicoId?: string;
  desigEcra: string;
  desigTeclaSeleccao: string;
};

type Pagamento = {
  id?: string;
  desigReferencia: string;
  tamanhoReferencia: number;
  textoEcraReferencia: string;
  isNew: boolean;
  montanteMin: number;
  montanteMax: number;
} | null;

type Recargas = {
  id?: string;
  desigUnidade: string;
  montantes: {
    id?: string;
    recargaId?: string;
    montante: number;
    quantidade: number;
    key?: string;
  }[];
} | null;

type Carregamento = {
  id?: string;
  desigReferencia: string;
  tamanhoReferencia: number;
  textoEcraReferencia: string;
  montanteTipo: MontanteTipo;
  montanteMin: number | null;
  montanteMax: number | null;
  montantes: {
    id?: string;
    carregamentoId?: string;
    montante: number;
    descricao: string;
    key?: string;
  }[];
} | null;

export type ProdutoPagamentoForm = ProdutoForm & {
  pagamento: Pagamento;
};

export type ProdutoRecargasForm = ProdutoForm & {
  recargas: Recargas;
};

export type ProdutoCarregamentoForm = ProdutoForm & {
  carregamento: Carregamento;
};

type BaseMontante = {
  id?: string;
  montante: number;
  key?: string;
};

export type Montante<T extends "descricao" | "quantidade"> = BaseMontante &
  (T extends "descricao" ? { descricao: string } : { quantidade: number });

export type GridButton = {
  id?: string;
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
  to: (id?: string) => void;
};

export type UrlParams = {
  eid: string;
  pid: string;
  sid: string;
};

export type ProdutoData = Produto & {
  pagamento: Pagamento;
  recargas: Recargas;
  carregamento: Carregamento;
};

export type ServicoData = Servico & { produtos: ProdutoData[] };

export type DataStore = Empresa & {
  servicos: ServicoData[];
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

export type ProdutoFormProps = {
  action: "Criar" | "Editar";
  isSubmitting: boolean;
};

export type McxDataStore = Pick<DataStore, "desigEcra"> & {
  servicos: ServicoData[];
  produtos: ProdutoData[];
  getServico: (id?: string) => ServicoData | undefined;
  getProduto: (id?: string) => ProdutoData | undefined;
};
