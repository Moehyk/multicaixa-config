import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreateProdutoParams } from "@/types";

export const produto = {
  create: async ({ id, input, serviceId }: CreateProdutoParams) => {
    try {
      await db.produto.upsert({
        where: {
          id: id,
        },
        create: {
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          type: input.type,
          servicoId: serviceId,
        },
        update: {
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          servicoId: serviceId,
        },
      });

      revalidatePath("/multicaixa/entidades/[id]/servicos/[id]", "page");

      if (!id) {
        return {
          status: 200,
          message: "Produto criado com sucesso.",
        };
      } else {
        return {
          status: 200,
          message: "Produto editado com sucesso.",
        };
      }
    } catch (error) {
      if (!id) {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar criar o produto.",
          error,
        };
      } else {
        return {
          status: 400,
          message: "Aconteceu um erro ao tentar editar o produto.",
          error,
        };
      }
    }
  },

  get: cache(async (id: string) => {
    try {
      const produto = await db.produto.findUnique({
        where: {
          id: id,
        },
      });

      return { data: produto, status: 200 };
    } catch (error) {
      return { status: 400, message: "Produto não encontrado.", error };
    }
  }),

  getAll: cache(async (id: string) => {
    try {
      const data = await db.produto.findMany({
        where: {
          servicoId: id,
        },
      });

      return { status: 200, data };
    } catch (error) {
      return {
        status: 400,
        message: "Lista de produtos não encontrada.",
        error,
      };
    }
  }),

  delete: async (id: string) => {
    try {
      await db.produto.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa/entidades/[id]/servicos/[id]", "page");

      return { status: 200, message: "Produto apagado com sucesso." };
    } catch (error) {
      return {
        status: 400,
        message: "Aconteceu um erro ao tentar apagar o produto.",
        error,
      };
    }
  },
};
