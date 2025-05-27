import { db } from "..";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkIfQueryParamsIsValid, getInvalidParamsMessage } from "@/utils";
import { Prisma } from "@prisma/client";

import { EmpresaForm } from "@/types";

const { getUser } = getKindeServerSession();

export const empresa = {
  create: async (input: EmpresaForm, id: string | undefined) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      // 1. Prepare the where clause
      const where = id
        ? { id } // For updates
        : { utilizadorId: user.id }; // For creations

      // 2. Perform the upsert
      const empresa = await db.empresa.upsert({
        where,
        create: {
          utilizadorId: user.id,
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
        message: id ? "Empresa atualizada" : "Empresa criada",
        data: { id: empresa.id }, // Return only essential data
      };
    } catch (error) {
      const isValid = checkIfQueryParamsIsValid(input);

      if (!isValid) {
        const message = getInvalidParamsMessage(input);

        return {
          status: 400,
          message,
          error: error instanceof Error ? error.message : "Erro desconhecido",
          // Include stack only in development
          ...(process.env.NODE_ENV === "development" && {
            debug: error instanceof Error ? error.stack : undefined,
          }),
        };
      } else {
        // Enhanced error logging
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

        // User-friendly error response
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

  get: async () => {
    const user = await getUser();
    try {
      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user?.id,
        },
      });
      return { data, status: 200 };
    } catch (error) {
      if (!user) {
        return {
          status: 400,
          message: "utilizador não encontrado",
          error: String(error),
        };
      } else {
        return {
          status: 500,
          message: "o servidor não conseguiu processar a solicitação",
          error: String(error),
        };
      }
    }
  },

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
          error,
        };
      } else {
        return {
          status: 500,
          message: "o servidor não conseguiu processar a solicitação",
          error,
        };
      }
    }
  },
};
