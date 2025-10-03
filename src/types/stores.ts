import type { JSXElementConstructor, RefObject } from "react";
import type { Empresa, Produto, ProdutoTipo } from "@prisma/client";
import type {
  ServicoData,
  ProdutoData,
  ProdutoType,
  PagamentoData,
  RecargasData,
  CarregamentoData,
} from "./data";
import type { Views, PreviewViews } from "./misc";

export type DataStore = Empresa & {
  servicos: ServicoData[];
};

export type McxDataStore = Pick<DataStore, "desigEcra" | "nome" | "id"> & {
  servicos: ServicoData[];
  produtos: ProdutoData[];
  getServico: (id?: string) => ServicoData | undefined;
  getProduto: (id?: string) => ProdutoData | undefined;
};

export type McxProdutoPreview = Pick<
  Produto,
  "desigEcra" | "desigTeclaSeleccao"
> &
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

export type McxPreviewStore = {
  produto: McxProdutoPreview;
};

export type McxPreviewStoreActions = {
  setProduto: (pagamento: ProdutoData) => void;
};

export type ViewsStore = {
  id?: string;
  McxView: JSXElementConstructor<any>;
  setView: (view: Views, id?: string) => void;
};

export type PreviewViewsStore = {
  McxPreviewView: JSXElementConstructor<any>;
  setPreviewViews: (type: PreviewViews) => void;
};

export type AppPreviewStore = Pick<
  Produto,
  "desigEcra" | "desigTeclaSeleccao"
> &
  (
    | {
        type: ProdutoType[0];
        pagamento: PagamentoData;
      }
    | {
        type: ProdutoType[1];
        recargas: RecargasData;
      }
    | {
        type: ProdutoType[2];
        carregamento: CarregamentoData;
      }
  );

export type ViewEndStoreData = {
  ecraTexto: string;
  montante: string;
  unidades?: string;
  referencia?: string;
};

export type ViewEndStore = ViewEndStoreData & {
  setMontante: (montante: string) => void;
  setEcraTexto: (ecraTexto: string) => void;
  setUnidades: (unidades: string | undefined) => void;
  setReferencia: (referencia: string) => void;
  resetEndStore: () => void;
};

export type InputErrorsStore = {
  referenciaError: boolean;
  montanteError: boolean;
  setRefError: (value: boolean) => void;
  setMontError: (value: boolean) => void;
};

export type InputRefsStore = {
  inputRefs: RefObject<HTMLInputElement[]> | null;
  setInputRefs: (value: RefObject<HTMLInputElement[]>) => void;
};
