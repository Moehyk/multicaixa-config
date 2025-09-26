import type { Dispatch, SetStateAction, KeyboardEvent } from "react";
import type { CustomInputValueType, GridButton, Views } from "./misc";

export type ProdutoFormProps = {
  action: "Criar" | "Editar";
  isSubmitting: boolean;
};

export type McxInputsProps = {
  value: string;
  valueLength: number;
  valueType: CustomInputValueType;
  onChange: (combinedOtp: string) => void;
};

export type McxInputProps = MontanteInputProps | ReferenciaInputProps;

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

export type GroupButtonsSize = {
  hasOnlyOneGroup?: boolean;
  isMultiGroupFirstOrLastPage?: boolean;
  isMultiGroupBetweenPage?: boolean;
};

export type GroupButtonsProps = {
  buttons: GridButton[];
  currentPage: number;
  dispatch: Dispatch<SetStateAction<number>>;
  lastPage?: number;
  isFreeAmount?: boolean;
  toFreeAmount: () => void;
  target: Views;
  buttonsGroups: GridButton[][];
};

export type McxSelectionViewProps = {
  buttons: GridButton[];
  target: Views;
  hasFreeAmount?: boolean;
  toFreeAmount?: () => void;
};

export type McxSelectBtnProps = {
  onClick: () => void;
  selectKey: string;
  selectText: string;
  selectSecondarytext?: string;
};
