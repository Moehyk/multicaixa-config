import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreateServicoParams } from "@/types";

export const servico = {
  create: async ({ entityId, id, input }: CreateServicoParams) => {
    const servico = await db.servico.upsert({
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

    if (!id) {
      if (!servico) {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar o serviço.",
        };
      }

      return {
        status: 200,
        message: "Serviço criado com sucesso.",
      };
    }

    if (!servico) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar editar o serviço.",
      };
    }

    return {
      status: 200,
      message: "Serviço editado com sucesso.",
    };
  },

  get: async (id: string) => {
    try {
      const servico = await db.servico.findUnique({
        where: {
          id: id,
        },
      });

      return { data: servico, status: 200 };
    } catch (error) {
      return { status: 400, message: "Serviço não encontrado." };
    }
  },

  getAll: async (id: string) => {
    const data = await db.servico.findMany({
      where: {
        entityId: id,
      },
    });

    if (!data) throw new Error("Lista de serviços não encontrada");

    return data;
  },

  delete: async (id: string) => {
    try {
      await db.servico.delete({
        where: {
          id: id,
        },
      });

      return { status: 200, message: "Serviço apagado com sucesso." };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar o serviço.",
      };
    }
  },
};
