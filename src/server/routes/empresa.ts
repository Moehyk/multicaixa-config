import { db } from "..";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkIfQueryParamsIsValid, getInvalidParamsMessage } from "@/utils";

import { EmpresaForm } from "@/types";

const { getUser } = getKindeServerSession();

export const empresa = {
  create: async (input: EmpresaForm, id: string | undefined) => {
    try {
      const user = await getUser();
      await db.empresa.upsert({
        where: {
          id: id,
        },
        create: {
          utilizadorId: user?.id,
          ...input,
        },
        update: {
          utilizadorId: user?.id,
          ...input,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "empresa criada com sucesso.",
      };
    } catch (error) {
      const isValid = checkIfQueryParamsIsValid(input);

      if (!id) {
        return {
          status: 400,
          message: "utilizador não encontrado",
          error,
        };
      } else if (!isValid) {
        const message = getInvalidParamsMessage(input);
        return {
          status: 400,
          message,
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

  get: cache(async (id: string) => {
    try {
      const data = await db.empresa.findUnique({
        where: {
          id: id,
        },
      });
      return { data, status: 200 };
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
