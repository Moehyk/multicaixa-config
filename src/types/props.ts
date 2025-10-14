import type {
  CustomInputValueType,
  GridButton,
  Views,
  BaseApiResponse,
  DeleteHandler,
  DataModel,
} from "./misc";

export interface ProdutoFormProps {
  action: "Criar" | "Editar";
  isSubmitting: boolean;
}

export interface McxInputsProps {
  value: string;
  valueLength: number;
  valueType: CustomInputValueType;
  onChange: (combinedOtp: string) => void;
}

export interface MontanteInputProps {
  valueType: "MONTANTE";
  min: number | null;
  max: number | null;
}

export interface ReferenciaInputProps {
  valueType: "REFERENCIA";
  tamanhoReferencia: number;
  textoEcraReferencia: string;
  desigReferencia: string;
}

export type McxInputProps = MontanteInputProps | ReferenciaInputProps;

export interface GroupButtonsSize {
  hasOnlyOneGroup?: boolean;
  isMultiGroupFirstOrLastPage?: boolean;
  isMultiGroupBetweenPage?: boolean;
}

export interface McxSelectionViewProps {
  buttons: GridButton[];
  target: Views;
  hasFreeAmount?: boolean;
  toFreeAmount?: () => void;
}

export interface McxSelectBtnProps {
  onClick: () => void;
  selectKey: string;
  selectText: string;
  selectSecondarytext?: string;
}

export type McxAppType = "DATA" | "PREVIEW";

export interface ConfirmDeleteProps<
  T extends BaseApiResponse = BaseApiResponse
> {
  onDelete: DeleteHandler<T>;
  dataId: string;
  model: DataModel;
}
