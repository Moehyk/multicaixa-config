import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreateProdutoParams } from "@/types";

export const produto = {
  create: async ({ id, input, serviceId }: CreateProdutoParams) => {
    const produto = await db.produto.upsert({
      where: {
        id: id,
      },
      create: {
        screenName: input.screenName,
        selectionName: input.selectionName,
        type: input.type,
        serviceId: serviceId,
      },
      update: {
        screenName: input.screenName,
        selectionName: input.selectionName,
        serviceId: serviceId,
      },
    });

    if (!id) {
      if (!produto) {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar o produto.",
        };
      }

      return {
        status: 200,
        message: "Produto criado com sucesso.",
      };
    }

    if (!produto) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar editar o produto.",
      };
    }

    return {
      status: 200,
      message: "Produto editado com sucesso.",
    };
  },

  get: async (id: string) => {
    try {
      const produto = await db.produto.findUnique({
        where: {
          id: id,
        },
      });

      return { data: produto, status: 200 };
    } catch (error) {
      return { status: 400, message: "Produto não encontrado." };
    }
  },

  getAll: async (id: string) => {
    try {
      const data = await db.produto.findMany({
        where: {
          serviceId: id,
        },
      });

      return { status: 200, data };
    } catch (error) {
      return { status: 400, message: "Lista de produtos não encontrada." };
    }
  },

  delete: async (id: string) => {
    try {
      await db.produto.delete({
        where: {
          id: id,
        },
      });

      return { status: 200, message: "Produto apagado com sucesso." };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar o produto.",
      };
    }
  },
};
