import type { Dispatch, SetStateAction, JSXElementConstructor } from "react";

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

type BaseMontante = {
  id?: string;
  montante: number;
  key?: string;
};

export type Montante<T extends "descricao" | "quantidade"> = BaseMontante &
  (T extends "descricao" ? { descricao: string } : { quantidade: number });

export type GridButton = {
  id?: string;
  selectText: string;
  selectSecondarytext?: string;
};

export type GroupButtons = {
  buttons: GridButton[];
  currentPage: number;
  dispatch: Dispatch<SetStateAction<number>>;
  lastPage?: number;
  to: (id?: string) => void;
  isFreeAmount?: boolean;
  toFreeAmount: () => void;
};

export type McxScreensType = 1 | 2 | 3;

export type CustomInputValueType = "REFERENCIA" | "MONTANTE";

export type Views = "empresa" | "servico" | "produto" | "end";
