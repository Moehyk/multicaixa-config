import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import {
  getInvalidParamsMessage,
  checkIfQueryParamsIsValid,
} from "@/utils/errors";

import { Empresa } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const empresa = {
  create: async (input: Empresa) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      // 1. Prepare the where clause
      const where = input.id
        ? { id: input.id } // For updates
        : { utilizadorId: user.id }; // For creations

      // 2. Perform the upsert
      const empresa = await db.empresa.upsert({
        where,
        create: {
          ...input,
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
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      const isValid = checkIfQueryParamsIsValid(input);

      if (!isValid) {
        const message = getInvalidParamsMessage(input);

        return {
          status: 400,
          message,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      } else {
        return {
          status: 500,
          message: "Ocorreu um erro ao processar sua solicitação",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }
    }
  },

  get: cache(async () => {
    const user = await getUser();
    try {
      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user?.id,
        },
      });
      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      if (!user.id) {
        return {
          status: 400,
          message: "utilizadorId inválido",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }

      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }),
};
