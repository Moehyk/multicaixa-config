import type { JSXElementConstructor } from "react";
import type { Empresa } from "@prisma/client";
import type { ServicoData, ProdutoData } from "./data";
import type { Views } from "./misc";

export type DataStore = Empresa & {
  servicos: ServicoData[];
};

export type McxDataStore = Pick<DataStore, "desigEcra" | "nome"> & {
  servicos: ServicoData[];
  produtos: ProdutoData[];
  getServico: (id?: string) => ServicoData | undefined;
  getProduto: (id?: string) => ProdutoData | undefined;
};

export type ViewsStore = {
  id?: string;
  McxView: JSXElementConstructor<any>;
  setView: (view: Views, id?: string) => void;
};

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
