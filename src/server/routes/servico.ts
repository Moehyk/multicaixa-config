import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { getUser } from "../services";
import { idError, validateUser, processErrors } from "@/utils/errors";

import { ServicoForm } from "@/types";

export const servico = {
  create: async (input: ServicoForm) => {
    const { data: user } = await getUser();
    const { id, empresaId, ...servicoInput } = input;

    try {
      validateUser(user);

      if (id) {
        throw new Error("Erro ao criar empresa: empresa já existe.");
      }

      if (!empresaId) {
        throw idError("empresa");
      }

      const servico = await db.servico.create({
        data: {
          ...servicoInput,
          empresaId,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço criado",
        data: servico,
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!empresaId,
          existentId: !!id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  },
  update: async (input: ServicoForm) => {
    const { data: user } = await getUser();
    const { id, ...servicoInput } = input;

    try {
      validateUser(user);

      if (!id) {
        throw idError("servico");
      }

      const servico = await db.servico.update({
        where: {
          id: input.id,
        },
        data: {
          ...servicoInput,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço actualizado",
        data: servico,
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  },

  get: cache(async (id: string) => {
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("servico");
      }

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
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  }),

  getAll: cache(async (id: string) => {
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("empresa");
      }

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
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  }),

  delete: async (id: string) => {
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("servico");
      }

      await db.servico.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Serviço removido." };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  },
};
