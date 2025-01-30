import { db } from "..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EntidadeForm } from "@/types";

const { getUser } = getKindeServerSession();

export const entidade = {
  create: async (input: EntidadeForm, id: string | undefined) => {
    const user = await getUser();
    const entidade = await db.entitade.upsert({
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

    if (!id) {
      if (!entidade)
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar a entidade.",
        };
      return {
        status: 200,
        message: "Entidade criada com sucesso.",
      };
    }
    if (!entidade)
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar editar a entidade.",
      };
    return {
      status: 200,
      message: "Entidade editada com sucesso.",
    };
  },

  get: async (id: string) => {
    try {
      const entidade = await db.entitade.findUnique({
        where: {
          id: id,
        },
      });
      return { data: entidade, status: 200 };
    } catch (error) {
      return { status: 400, message: "Entidade não encontrada." };
    }
  },

  getAll: async () => {
    const user = await getUser();
    const data = await db.entitade.findMany({
      where: {
        utilizadorId: user?.id,
      },
    });
    if (!data) throw new Error("Lista de entidades não encontrada.");
    return data;
  },

  delete: async (id: string) => {
    const result = await db.entitade.delete({
      where: {
        id: id,
      },
    });

    if (!result)
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar a entidade.",
      };
    return {
      status: 200,
      message: "Entidade apagada com sucesso.",
    };
  },
};
