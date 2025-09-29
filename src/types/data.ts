import type {
  Servico,
  Produto,
  Pagamento,
  Recargas,
  RecaMontante,
  Carregamento,
  CarrMontante,
} from "@prisma/client";

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

export type ProdutoType = ["pagamento", "recargas", "carregamentos"];

export type ProdutoData = Omit<Produto, "type"> & {
  servico: Pick<Servico, "desigSistema">;
} & (
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
