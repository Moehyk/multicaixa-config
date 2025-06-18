import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import {
  validateCuid,
  validateUser,
  validateInputs,
  throwValidationError,
  processErrors,
} from "@/utils/errors";

import { PagamentoForm } from "@/types";

export const pagamento = {
  create: async (produtoId: string, input: PagamentoForm) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(produtoId);
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: input.id ? "pagamento" : "produto",
        inputs: isInputsValid,
        message,
      });

      // 1. Prepare the where clause
      const where = input.id
        ? { id: input.id } // For updates
        : { produtoId: produtoId }; // For creations

      // 2. Perform the upsert
      const pagamento = await db.pagamento.upsert({
        where,
        create: {
          produtoId: produtoId,
          montante_maximo: input.montante_maximo,
          montante_minimo: input.montante_minimo,
          desig_referencia: input.desig_referencia,
          texto_ecra_referencia: input.texto_ecra_referencia,
          tamanho_referencia: input.tamanho_referencia,
        },
        update: {
          montante_maximo: input.montante_maximo,
          montante_minimo: input.montante_minimo,
          desig_referencia: input.desig_referencia,
          texto_ecra_referencia: input.texto_ecra_referencia,
          tamanho_referencia: input.tamanho_referencia,
        },
      });

      revalidatePath("/multicaixa", "page");

      // 3. Return minimal serializable data
      return {
        status: 200,
        message: input.id ? "Pagamento atualizado" : "Pagamento criado",
        data: pagamento, // Return only essential data
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: true,
          inputs: isInputsValid,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
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
