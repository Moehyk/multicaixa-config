import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import { processUpsertError } from "@/utils";

import { ServicoForm, CreateServicoParams } from "@/types";

export const servico = {
  create: async (empresaId: string, input: ServicoForm) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      const servico = await db.servico.create({
        data: { ...input, empresaId },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço criado",
        data: servico,
      };
    } catch (error) {
      const response = processUpsertError(error, input);

      return response;
    }
  },
  update: async (id: string, input: ServicoForm) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      const servico = await db.servico.update({
        where: {
          id: id,
        },
        data: {
          ...input,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço actualizado",
        data: servico,
      };
    } catch (error) {
      const response = processUpsertError(error, input);

      return response;
    }
  },

  get: cache(async (id: string) => {
    try {
      const servico = await db.servico.findUnique({
        where: {
          id: id,
        },
        include: {
          produtos: true,
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
        include: {
          produtos: true,
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
