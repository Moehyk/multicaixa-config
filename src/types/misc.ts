import { Utilizador } from "@prisma/client";

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
  value?: string;
  isFreeAmount?: boolean;
};

export type CustomInputValueType = "REFERENCIA" | "MONTANTE";

export type Views = "empresa" | "servico" | "produto" | "end";

export type PreviewViews = "servico" | "produto" | "end";

export type McxScreensType = 1 | 2 | 3;

export type McxInputActions = (
  length: number,
  mmin: number,
  mmax: number,
  screens: number[]
) => {
  screen: McxScreensType;
  continueHandler: () => void;
  clearHandler: () => void;
};

export type UserInfo = Pick<Utilizador, "name" | "surname" | "picture">;

export type ServicoSearchParams = {
  s: string;
  e: string;
};
