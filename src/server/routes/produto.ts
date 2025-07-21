import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";

import { idError, validateUser, processErrors } from "@/utils/errors";

import {
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
} from "@/types";

export const produto = {
  pagamento: {
    create: async (input: ProdutoPagamentoForm) => {
      const user = await getUser();
      const { id, servicoId, ...prodPagamentoInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!input.pagamento) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto pagamento."
          );
        }

        const produtoPagamento = await db.produto.create({
          data: {
            ...prodPagamentoInput,
            servicoId: servicoId,
            type: "pagamento",
            pagamento: {
              create: {
                ...input.pagamento,
                isNew: true,
              },
            },
          },
          include: {
            pagamento: true,
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Pagamento criado",
          data: produtoPagamento,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!servicoId,
            existentId: !!id,
            invalidInput: !!prodPagamentoInput.pagamento,
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
    update: async (input: ProdutoPagamentoForm) => {
      const user = await getUser();
      const { id, ...prodPagamentoInput } = input;

      try {
        validateUser(user);

        if (!id) {
          throw idError("produto");
        }

        if (!prodPagamentoInput.pagamento) {
          throw new Error(
            "Erro ao actualizar produto: dados do produto não equivalem ao tipo de produto pagamento."
          );
        }

        const produto = await db.produto.update({
          where: {
            id,
          },
          data: {
            ...prodPagamentoInput,
            type: "pagamento",
            pagamento: {
              update: {
                where: {
                  id: prodPagamentoInput.pagamento.id,
                },
                data: {
                  ...prodPagamentoInput.pagamento,
                },
              },
            },
          },
          include: {
            pagamento: true,
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Pagamento actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!prodPagamentoInput.pagamento,
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
  },
  recargas: {
    create: async (input: ProdutoRecargasForm) => {
      const user = await getUser();
      const { id, servicoId, ...prodRecargasInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!prodRecargasInput.recargas) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto recargas."
          );
        }

        const produtoRecargas = await db.produto.create({
          data: {
            ...prodRecargasInput,
            servicoId: servicoId,
            type: "recargas",
            recargas: {
              create: {
                ...prodRecargasInput.recargas,
                montantes: {
                  createMany: {
                    data: prodRecargasInput.recargas.montantes.map((m) => ({
                      montante: m.montante,
                      quantidade: m.quantidade,
                    })),
                  },
                },
              },
            },
          },
          include: {
            recargas: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        // 3. Return minimal serializable data
        return {
          status: 200,
          message: "Produto Recargas criado",
          data: produtoRecargas, // Return only essential data
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!servicoId,
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
    update: async (input: ProdutoRecargasForm) => {
      const user = await getUser();
      const { id, ...prodRecargasInput } = input;

      try {
        validateUser(user);

        if (!id) {
          throw idError("produto");
        }

        if (!prodRecargasInput.recargas) {
          throw new Error(
            "Erro ao actualizar produto: dados do produto não equivalem ao tipo de produto recargas."
          );
        }

        const produto = await db.produto.update({
          where: {
            id: id,
          },
          data: {
            ...prodRecargasInput,
            type: "recargas",
            recargas: {
              update: {
                data: {
                  ...prodRecargasInput.recargas,
                  montantes: {
                    deleteMany: {
                      id: {
                        notIn: prodRecargasInput.recargas.montantes
                          .filter((m) => m.id) // Only consider montantes with IDs
                          .map((m) => m.id!),
                      },
                    },
                    updateMany: prodRecargasInput.recargas.montantes
                      .filter((m) => m.id) // Only update montantes with IDs
                      .map((m) => ({
                        where: { id: m.id },
                        data: {
                          montante: m.montante,
                          quantidade: m.quantidade,
                        },
                      })),
                    create: prodRecargasInput.recargas.montantes
                      .filter((m) => !m.id) // Only create montantes without IDs
                      .map((m) => ({
                        montante: m.montante,
                        quantidade: m.quantidade,
                      })),
                  },
                },
              },
            },
          },
          include: {
            recargas: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Recargas actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!prodRecargasInput.recargas,
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
  },

  carregamento: {
    create: async (input: ProdutoCarregamentoForm) => {
      const user = await getUser();
      const { id, servicoId, ...prodCarregamentoInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!prodCarregamentoInput.carregamento) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto carregamento."
          );
        }

        const produtoCarregamento = await db.produto.create({
          data: {
            ...prodCarregamentoInput,
            servicoId: servicoId,
            type: "carregamentos",
            carregamento: {
              create: {
                ...prodCarregamentoInput.carregamento,
                montanteMin:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_pre_definido"
                    ? undefined
                    : prodCarregamentoInput.carregamento.montanteMin,
                montanteMax:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_pre_definido"
                    ? undefined
                    : prodCarregamentoInput.carregamento.montanteMax,
                montantes:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_livre"
                    ? undefined
                    : {
                        createMany: {
                          data:
                            prodCarregamentoInput.carregamento.montantes.map(
                              (m) => ({
                                montante: m.montante,
                                descricao: m.descricao,
                              })
                            ) || [],
                        },
                      },
              },
            },
          },
          include: {
            carregamento: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Carregamento criado",
          data: produtoCarregamento,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!servicoId,
            invalidInput: !!prodCarregamentoInput.carregamento,
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

    update: async (input: ProdutoCarregamentoForm) => {
      const user = await getUser();
      const { id, ...prodCarregamentoInput } = input;

      try {
        validateUser(user);

        if (!id) {
          throw idError("produto");
        }

        if (!prodCarregamentoInput.carregamento) {
          throw new Error(
            "Erro ao actualizar produto: dados do produto não equivalem ao tipo de produto carregamento."
          );
        }

        const produto = await db.produto.update({
          where: {
            id,
          },
          data: {
            ...prodCarregamentoInput,
            type: "carregamentos",
            carregamento: {
              update: {
                data: {
                  ...prodCarregamentoInput.carregamento,
                  montanteMin:
                    prodCarregamentoInput.carregamento.montanteTipo ===
                    "montante_pre_definido"
                      ? undefined
                      : prodCarregamentoInput.carregamento.montanteMin,
                  montanteMax:
                    prodCarregamentoInput.carregamento.montanteTipo ===
                    "montante_pre_definido"
                      ? undefined
                      : prodCarregamentoInput.carregamento.montanteMax,
                  montantes:
                    prodCarregamentoInput.carregamento.montanteTipo ===
                    "montante_livre"
                      ? undefined
                      : {
                          deleteMany: {
                            id: {
                              notIn:
                                prodCarregamentoInput.carregamento.montantes
                                  .filter((m) => m.id) // Only consider montantes with IDs
                                  .map((m) => m.id!),
                            },
                          },
                          updateMany:
                            prodCarregamentoInput.carregamento.montantes
                              .filter((m) => m.id) // Only update montantes with IDs
                              .map((m) => ({
                                where: { id: m.id },
                                data: {
                                  montante: m.montante,
                                  descricao: m.descricao,
                                },
                              })),
                          create: prodCarregamentoInput.carregamento.montantes
                            .filter((m) => !m.id) // Only create montantes without IDs
                            .map((m) => ({
                              montante: m.montante,
                              descricao: m.descricao,
                            })),
                        },
                },
              },
            },
          },
          include: {
            carregamento: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Carregamento actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!prodCarregamentoInput.carregamento,
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
  },

  get: cache(async (id: string) => {
    const user = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("produto");
      }

      const produto = await db.produto.findUnique({
        where: {
          id: id,
        },
        include: {
          carregamento: {
            include: {
              montantes: true,
            },
          },
          pagamento: true,
          recargas: {
            include: {
              montantes: true,
            },
          },
        },
      });

      return { data: produto, status: 200 };
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
    const user = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("servico");
      }

      const produtos = await db.produto.findMany({
        where: {
          servicoId: id,
        },
        include: {
          carregamento: {
            include: {
              montantes: true,
            },
          },
          pagamento: true,
          recargas: {
            include: {
              montantes: true,
            },
          },
        },
      });

      return { status: 200, data: produtos };
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
    const user = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("produto");
      }

      await db.produto.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Produto apagado com sucesso." };
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
