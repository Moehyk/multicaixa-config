import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import { processUpsertError } from "@/utils";

import { Empresa } from "@prisma/client";

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
          ...input,
          // Don't update utilizadorId during updates
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
      const response = processUpsertError(error, input);

      return response;
    }
  },

  get: cache(async () => {
    const user = await getUser();
    try {
      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user?.id,
        },
        include: {
          servicos: true,
        },
      });
      return { data, status: 200, message: "Empresa recuperada com sucesso" };
    } catch (error) {
      if (!user) {
        return {
          status: 400,
          message: "Utilizador não encontrado",
          error: error instanceof Error ? error.message : "Erro desconhecido",
          // Include stack only in development
          ...(process.env.NODE_ENV === "development" && {
            debug: error instanceof Error ? error.stack : undefined,
          }),
        };
      } else {
        return {
          status: 500,
          message: "Ocorreu um erro ao processar sua solicitação",
          error: error instanceof Error ? error.message : "Erro desconhecido",
          // Include stack only in development
          ...(process.env.NODE_ENV === "development" && {
            debug: error instanceof Error ? error.stack : undefined,
          }),
        };
      }
    }
  }),

  delete: async (id: string) => {
    try {
      await db.empresa.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "empresa apagada com sucesso" };
    } catch (error) {
      if (!id) {
        return {
          status: 400,
          message: "utilizador não encontrado",
          error: error instanceof Error ? error.message : "Erro desconhecido",
          // Include stack only in development
          ...(process.env.NODE_ENV === "development" && {
            debug: error instanceof Error ? error.stack : undefined,
          }),
        };
      } else {
        return {
          status: 500,
          message: "Ocorreu um erro ao processar sua solicitação",
          error: error instanceof Error ? error.message : "Erro desconhecido",
          // Include stack only in development
          ...(process.env.NODE_ENV === "development" && {
            debug: error instanceof Error ? error.stack : undefined,
          }),
        };
      }
    }
  },
};
