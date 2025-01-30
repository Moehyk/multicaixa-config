import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreateServicoParams } from "@/types";

export const servico = {
  create: async ({ entityId, id, input }: CreateServicoParams) => {
    try {
      await db.servico.upsert({
        where: {
          id: id,
        },
        create: {
          entityId: entityId,
          screenName: input.screenName,
          selectionName_1: input.selectionName_1,
          selectionName_2: input.selectionName_2,
          systemName: input.systemName,
        },
        update: {
          entityId: entityId,
          screenName: input.screenName,
          selectionName_1: input.selectionName_1,
          selectionName_2: input.selectionName_2,
          systemName: input.systemName,
        },
      });

      revalidatePath("/multicaixa/entidades/[id]", "page");

      if (!id) {
        return {
          status: 200,
          message: "Serviço criado com sucesso.",
        };
      } else {
        return {
          status: 200,
          message: "Serviço editado com sucesso.",
        };
      }
    } catch (error) {
      if (!id) {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar o serviço.",
          error,
        };
      } else {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar editar o serviço.",
          error,
        };
      }
    }
  },

  get: cache(async (id: string) => {
    try {
      const servico = await db.servico.findUnique({
        where: {
          id: id,
        },
      });

      return { data: servico, status: 200 };
    } catch (error) {
      return { status: 400, message: "Serviço não encontrado.", error };
    }
  }),

  getAll: cache(async (id: string) => {
    try {
      const servicos = await db.servico.findMany({
        where: {
          entityId: id,
        },
      });

      return { data: servicos, status: 200 };
    } catch (error) {
      return {
        status: 400,
        message: "Lista de serviços não encontrada.",
        error,
      };
    }
  }),

  delete: async (id: string) => {
    try {
      await db.servico.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa/entidades/[id]", "page");

      return { status: 200, message: "Serviço apagado com sucesso." };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar o serviço.",
        error,
      };
    }
  },
};
