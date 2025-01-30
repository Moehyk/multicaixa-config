import { db } from "..";
import { CreateCarregamentoParams } from "@/types";

export const carregamento = {
  getAll: async (id: string) => {
    try {
      const data = await db.carregamento.findMany({
        where: {
          productId: id,
        },
      });

      return { status: 200, data };
    } catch (error) {
      return { status: 400, message: "Lista de carregamentos não encontrada." };
    }
  },
};
