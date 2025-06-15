import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import {
  validateUser,
  validateInputs,
  validateCuid,
  processErrors,
  throwValidationError,
} from "@/utils/errors";

import { Empresa } from "@prisma/client";

export const empresa = {
  create: async (input: Empresa) => {
    const user = await validateUser();
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: true,
        data: "empresa",
        inputs: isInputsValid,
        message,
      });

      // 1. Prepare the where clause
      const where = input.id
        ? { id: input.id } // For updates
        : { utilizadorId: user.id }; // For creations

      // 2. Perform the upsert
      const empresa = await db.empresa.upsert({
        where,
        create: {
          utilizadorId: user.id,
          cae: input.cae,
          nome: input.nome,
          sigla: input.sigla,
          telefone: input.telefone,
          email: input.email,
          responsavel: input.responsavel,
          morada: input.morada,
          localidade: input.localidade,
          numero_pessoa_colectiva: input.numero_pessoa_colectiva,
          numero_entidade: input.numero_entidade,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
        },
        update: {
          cae: input.cae,
          nome: input.nome,
          sigla: input.sigla,
          telefone: input.telefone,
          email: input.email,
          responsavel: input.responsavel,
          morada: input.morada,
          localidade: input.localidade,
          numero_pessoa_colectiva: input.numero_pessoa_colectiva,
          numero_entidade: input.numero_entidade,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
        },
      });

      // 3. Return minimal serializable data
      revalidatePath("/multicaixa", "page");
      return {
        status: 200,
        message: input.id ? "Empresa atualizada" : "Empresa criada",
        data: empresa, // Return only essential data
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

  get: cache(async () => {
    const user = await validateUser();

    try {
      throwValidationError({
        user,
        cuid: true,
        data: "utilizador",
        inputs: true,
      });

      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user.id,
        },
        include: {
          servicos: true,
        },
      });
      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: true,
          inputs: true,
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
  }),
};
