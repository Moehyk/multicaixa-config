import type { ProdutoData, Pagamento, Recargas, Carregamento } from "@/types";
import type { ProdutoTipo } from "@prisma/client";

const produtoValidator: Record<ProdutoTipo, (data: unknown) => boolean> = {
  pagamento: (data): data is NonNullable<Pagamento> => !!data,
  recargas: (data): data is NonNullable<Recargas> =>
    !!data && Array.isArray((data as any).montantes),
  carregamentos: (data): data is NonNullable<Carregamento> =>
    !!data && Array.isArray((data as any).montantes),
};

export const transformProdutoData = (data: any): ProdutoData => {
  if (produtoValidator.pagamento(data.pagamento))
    return {
      desigEcra: data.desigEcra,
      desigTeclaSeleccao: data.desigTeclaSeleccao,
      type: data.type,
      id: data.id,
      servicoId: data.servicoId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      pagamento: data.pagamento,
    } as const satisfies ProdutoData;

  if (produtoValidator.recargas(data.recargas))
    return {
      desigEcra: data.desigEcra,
      desigTeclaSeleccao: data.desigTeclaSeleccao,
      type: data.type,
      id: data.id,
      servicoId: data.servicoId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      recargas: data.recargas,
    } as const satisfies ProdutoData;

  if (produtoValidator.carregamentos(data.carregamento))
    return {
      desigEcra: data.desigEcra,
      desigTeclaSeleccao: data.desigTeclaSeleccao,
      type: data.type,
      id: data.id,
      servicoId: data.servicoId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      carregamento: data.carregamento,
    } as const satisfies ProdutoData;

  return data;
};
