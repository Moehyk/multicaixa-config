import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EntidadeForm } from "@/types";

const { getUser } = getKindeServerSession();

export const entidade = {
  create: async (input: EntidadeForm, id: string | undefined) => {
    try {
      const user = await getUser();
      await db.entitade.upsert({
        where: {
          id: id,
        },
        create: {
          utilizadorId: user?.id,
          screenName: input.screenName,
          selectionName: input.selectionName,
          useLeftZero: false,
        },
        update: {
          utilizadorId: user?.id,
          screenName: input.screenName,
          selectionName: input.selectionName,
          useLeftZero: false,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Entidade criada com sucesso.",
      };
    } catch (error) {
      if (!id) {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar a entidade.",
        };
      } else {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar editar a entidade.",
        };
      }
    }
  },

  get: cache(async (id: string) => {
    try {
      const data = await db.entitade.findUnique({
        where: {
          id: id,
        },
      });
      return { data, status: 200 };
    } catch (error) {
      return { status: 400, message: "Entidade não encontrada." };
    }
  }),

  getAll: cache(async () => {
    try {
      const user = await getUser();
      const data = await db.entitade.findMany({
        where: {
          utilizadorId: user?.id,
        },
      });
      return { status: 200, data };
    } catch (error) {
      return { status: 400, message: "Lista de entidades não encontrada." };
    }
  }),

  delete: async (id: string) => {
    try {
      await db.entitade.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Entidade apagada com sucesso." };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar a entidade.",
      };
    }
  },
};
