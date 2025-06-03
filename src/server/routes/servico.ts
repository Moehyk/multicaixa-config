import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { CreateServicoParams } from "@/types";
import { Servico } from "@prisma/client";

export const servico = {
  create: async ({ empresaId, id, input }: CreateServicoParams) => {
    try {
      await db.servico.upsert({
        where: {
          id: id,
        },
        create: {
          empresaId,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao_1: input.desig_tecla_seleccao_1,
          desig_tecla_seleccao_2: input.desig_tecla_seleccao_2,
          desig_sistema: input.desig_sistema,
        },
        update: {
          empresaId,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao_1: input.desig_tecla_seleccao_1,
          desig_tecla_seleccao_2: input.desig_tecla_seleccao_2,
          desig_sistema: input.desig_sistema,
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
          empresaId: id,
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
