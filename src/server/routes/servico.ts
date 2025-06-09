import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import {
  getInvalidParamsMessage,
  checkIfQueryParamsIsValid,
} from "@/utils/errors";

import { ServicoForm } from "@/types";
import { Prisma } from "@prisma/client";

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
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      const isValid = checkIfQueryParamsIsValid(input);

      if (!isValid) {
        const message = getInvalidParamsMessage(input);

        return {
          status: 400,
          message,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      } else {
        return {
          status: 500,
          message: "Ocorreu um erro ao processar sua solicitação",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }
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
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      const isValid = checkIfQueryParamsIsValid(input);

      if (!isValid) {
        const message = getInvalidParamsMessage(input);

        return {
          status: 400,
          message,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      } else {
        return {
          status: 500,
          message: "Ocorreu um erro ao processar sua solicitação",
          error: error instanceof Error ? error.message : "Erro desconhecido",
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
        include: {
          produtos: true,
        },
      });

      return { data: servico, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      if (!id) {
        return {
          status: 400,
          message: "servicoId inválido",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }

      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
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
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      if (!id) {
        return {
          status: 400,
          message: "empresaId fornecido inválido",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }

      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
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

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Serviço removido." };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error Stack:", error.stack);
        console.error("Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
        });

        // For Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma Error Code:", error.code);
          console.error("Prisma Meta:", error.meta);
        }
      } else {
        console.error("Unknown Error Type:", error);
      }

      if (!id) {
        return {
          status: 400,
          message: "servicoId inválido",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }

      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  },
};
