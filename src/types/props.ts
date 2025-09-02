import type { CustomInputValueType } from "./misc";

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
