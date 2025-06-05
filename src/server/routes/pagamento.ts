import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreatePagamentoParams } from "@/types";

export const pagamento = {
  create: async ({ productId, input }: CreatePagamentoParams) => {
    try {
      await db.pagamento.upsert({
        where: {
          produtoId: productId,
        },
        create: {
          produtoId: productId,
          montante_maximo: input.montante_maximo,
          montante_minimo: input.montante_minimo,
          desig_referencia: input.desig_referencia,
          texto_ecra_referencia: input.texto_ecra_referencia,
          tamanho_referencia: input.tamanho_referencia,
        },
        update: {
          produtoId: productId,
          montante_maximo: input.montante_maximo,
          montante_minimo: input.montante_minimo,
          desig_referencia: input.desig_referencia,
          texto_ecra_referencia: input.texto_ecra_referencia,
          tamanho_referencia: input.tamanho_referencia,
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
        error,
      };
    }
  },

  get: cache(async (id: string) => {
    try {
      const pagamento = await db.pagamento.findUnique({
        where: {
          produtoId: id,
        },
      });

      revalidatePath(
        "/multicaixa/entidades/[id]/servicos/[id]/produtos/[id]",
        "page"
      );

      return { data: pagamento, status: 200 };
    } catch (error) {
      return { status: 400, message: "Pagamento não encontrado.", error };
    }
  }),
};
