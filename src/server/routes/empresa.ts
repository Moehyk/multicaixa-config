import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import { validateUser, processErrors } from "@/utils/errors";

import { Empresa } from "@prisma/client";

export const empresa = {
  create: async (input: Empresa) => {
    const user = await getUser();

    try {
      validateUser(user);

      // 1. Prepare the where clause
      const where = input.id
        ? { id: input.id } // For updates
        : { utilizadorId: user.id }; // For creations

      // 2. Perform the upsert
      const empresa = await db.empresa.upsert({
        where,
        create: {
          ...input,
          utilizadorId: user.id,
        },
        update: {
          ...input,
        },
      });

      revalidatePath("/multicaixa", "page");

      // 3. Return minimal serializable data
      return {
        status: 200,
        message: input.id ? "Empresa atualizada" : "Empresa criada",
        data: empresa, // Return only essential data
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          id: !!input.id,
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
    const user = await getUser();

    try {
      validateUser(user);

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
          id: !!user.id,
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
