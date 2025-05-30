import { cache } from "react";
import { db } from "..";

export const carregamento = {
  getAll: cache(async (id: string) => {
    try {
      const data = await db.carregamento.findMany({
        where: {
          id: id,
        },
      });

      return { status: 200, data };
    } catch (error) {
      return {
        status: 400,
        message: "Lista de carregamentos não encontrada.",
        error,
      };
    }
  }),
};
