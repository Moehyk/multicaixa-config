import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import { idError, validateUser, processErrors } from "@/utils/errors";

import { ServicoForm } from "@/types";

export const servico = {
  create: async (id: string, input: ServicoForm) => {
    const user = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("empresa");
      }

      const servico = await db.servico.create({
        data: {
          empresaId: id,
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
      if (error instanceof Error) {
        const response = processErrors(error, {
          id: !!input.empresaId,
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
    const user = await getUser();

    try {
      validateUser(user);

      if (!input.id) {
        throw idError("servico");
      }

      const servico = await db.servico.update({
        where: {
          id: input.id,
        },
        data: {
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          desig_sistema: input.desig_sistema,
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
          id: !!input.id,
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
    const user = await getUser();

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
          id: !!id,
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
    const user = await getUser();

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
          id: !!id,
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
    const user = await getUser();

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
          id: !!id,
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
