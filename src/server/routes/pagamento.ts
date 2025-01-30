import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreatePagamentoParams } from "@/types";

export const pagamento = {
  create: async ({ productId, input }: CreatePagamentoParams) => {
    try {
      await db.pagamento.upsert({
        where: {
          productId: productId,
        },
        create: {
          productId: productId,
          maxAmount: input.maxAmount,
          minAmount: input.minAmount,
          referenceName: input.referenceName,
          referenceScreenText: input.referenceScreenText,
          referenceSize: input.referenceSize,
        },
        update: {
          productId: productId,
          maxAmount: input.maxAmount,
          minAmount: input.minAmount,
          referenceName: input.referenceName,
          referenceScreenText: input.referenceScreenText,
          referenceSize: input.referenceSize,
        },
      });

      revalidatePath(
        "/multicaixa/entidades/[id]/servicos/[id]/produtos/[id]",
        "page"
      );

      return {
        status: 200,
        message: "Pagamento configurado com sucesso.",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar configurar o pagamento.",
      };
    }
  },

  get: cache(async (id: string) => {
    try {
      const pagamento = await db.pagamento.findUnique({
        where: {
          productId: id,
        },
      });

      revalidatePath(
        "/multicaixa/entidades/[id]/servicos/[id]/produtos/[id]",
        "page"
      );

      return { data: pagamento, status: 200 };
    } catch (error) {
      return { status: 400, message: "Pagamento não encontrado." };
    }
  }),
};
