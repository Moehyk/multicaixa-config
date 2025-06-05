import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import {
  processCreateUpdateError,
  processGetDeleteError,
} from "@/utils/errors";

import { ServicoForm } from "@/types";

export const servico = {
  create: async (empresaId: string, input: ServicoForm) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      const servico = await db.servico.create({
        data: {
          empresaId,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          desig_sistema: input.desig_sistema,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço criado",
        data: servico,
      };
    } catch (error) {
      return processCreateUpdateError(input, error);
    }
  },
  update: async (input: ServicoForm) => {
    try {
      const user = await getUser();
      if (!user?.id) throw new Error("User not authenticated");

      const servico = await db.servico.update({
        where: {
          id: input.id,
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
      return processCreateUpdateError(input, error);
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
      return processGetDeleteError(id, "servico", error);
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
      return processGetDeleteError(id, "empresa", error);
    }
  }),

  delete: async (id: string) => {
    try {
      await db.servico.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Serviço apagado com sucesso." };
    } catch (error) {
      return processGetDeleteError(id, "servico", error);
    }
  },
};
