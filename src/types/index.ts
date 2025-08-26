import type { Dispatch, SetStateAction } from "react";
import type {
  Empresa,
  Servico,
  Produto,
  ProdutoTipo,
  Pagamento,
  Recargas,
  RecaMontante,
  Carregamento,
  CarrMontante,
} from "@prisma/client";

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
  "desigEcra" | "desigTeclaSeleccao" | "desigSistema" | "id"
> &
  Partial<Pick<Servico, "id">>;

export type ProdutoForm = Pick<
  Produto,
  "desigEcra" | "desigTeclaSeleccao" | "servicoId" | "id"
> &
  Partial<Pick<Produto, "id" | "servicoId">>;

export type PagamentoData =
  | (Pick<
      Pagamento,
      | "id"
      | "montanteMin"
      | "montanteMax"
      | "isNew"
      | "desigReferencia"
      | "tamanhoReferencia"
      | "textoEcraReferencia"
    > &
      Partial<Pick<Pagamento, "id">>)
  | null;

type RecargasMontante = Pick<
  RecaMontante,
  "id" | "montante" | "quantidade" | "recargaId"
> &
  Partial<Pick<RecaMontante, "id" | "recargaId">> & { key?: string };

export type RecargasData =
  | (Pick<Recargas, "desigUnidade" | "id"> &
      Partial<Pick<Recargas, "id">> & {
        montantes: RecargasMontante[];
      })
  | null;

type CarregamentoMontante = Pick<
  CarrMontante,
  "id" | "montante" | "descricao" | "carregamentoId"
> &
  Partial<Pick<CarrMontante, "id" | "carregamentoId">> & { key?: string };

export type CarregamentoData =
  | (Pick<
      Carregamento,
      | "desigReferencia"
      | "tamanhoReferencia"
      | "textoEcraReferencia"
      | "montanteTipo"
      | "id"
      | "montanteMax"
      | "montanteMin"
    > &
      Partial<Pick<Carregamento, "id">> & {
        montantes: CarregamentoMontante[];
      })
  | null;

export type ProdutoPagamentoForm = ProdutoForm & {
  pagamento: PagamentoData;
};

export type ProdutoRecargasForm = ProdutoForm & {
  recargas: RecargasData;
};

export type ProdutoCarregamentoForm = ProdutoForm & {
  carregamento: CarregamentoData;
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

type ProdutoType = ["pagamento", "recargas", "carregamentos"];

export type ProdutoData = Omit<Produto, "type"> &
  (
    | {
        type: ProdutoType[0];
        pagamento: NonNullable<PagamentoData>;
      }
    | {
        type: ProdutoType[1];
        recargas: NonNullable<RecargasData>;
      }
    | {
        type: ProdutoType[2];
        carregamento: NonNullable<CarregamentoData>;
      }
  );

export type ServicoData = Servico & { produtos: ProdutoData[] };

export type DataStore = Empresa & {
  servicos: ServicoData[];
};

export type Referencia = Pick<
  Carregamento,
  | "desigReferencia"
  | "tamanhoReferencia"
  | "textoEcraReferencia"
  | "montanteMax"
  | "montanteMin"
  | "id"
>;

export type CarregamentoFree = {
  montanteTipo: "montante_livre";
} & Referencia;

export type CarregamentoPre = {
  montanteTipo: "montante_pre_definido";
  montantes: CarrMontante[];
};

export type CarregamentoBoth = {
  montanteTipo: "ambos";
  montantes: Omit<CarrMontante, "createdAt" | "updatedAt">[];
} & Referencia;

export type RenderCarregamento =
  | CarregamentoPre
  | CarregamentoFree
  | CarregamentoBoth;

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

export type CustomInputValueType = "REFERENCIA" | "MONTANTE";

export type McxInputsProps = {
  value: string;
  valueLength: number;
  valueType: CustomInputValueType;
  onChange: (combinedOtp: string) => void;
};

export type MontanteInputProps = {
  valueType: "MONTANTE";
  min: number;
  max: number;
};

export type ReferenciaInputProps = {
  valueType: "REFERENCIA";
  tamanhoReferencia: number;
  textoEcraReferencia: string;
  desigReferencia: string;
};

export type McxInputProps = MontanteInputProps | ReferenciaInputProps;
