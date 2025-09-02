import type { JSXElementConstructor } from "react";
import type { Empresa } from "@prisma/client";
import type { ServicoData, ProdutoData } from "./data";
import type { Views } from "./misc";

export type DataStore = Empresa & {
  servicos: ServicoData[];
};

export type McxDataStore = Pick<DataStore, "desigEcra"> & {
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

export type ViewEndStore = {
  ecraTexto: string;
  montante: number;
  unidades?: string;
  referencia?: string;
};
