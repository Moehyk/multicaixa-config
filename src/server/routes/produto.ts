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

      try {
        validateUser(user);

        if (!input.servicoId) {
          throw idError("servico");
        }

        if (!input.pagamento) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produtoPagamento = await db.produto.create({
          data: {
            ...input,
            servicoId: input.servicoId,
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
            id: !!input.servicoId,
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

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.pagamento) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            type: "pagamento",
            pagamento: {
              update: {
                where: {
                  id: input.pagamento.id,
                },
                data: {
                  desig_referencia: input.pagamento.desig_referencia,
                  tamanho_referencia: input.pagamento.tamanho_referencia,
                  texto_ecra_referencia: input.pagamento.texto_ecra_referencia,
                  montante_minimo: input.pagamento.montante_minimo,
                  montante_maximo: input.pagamento.montante_maximo,
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
  },
  recargas: {
    create: async (input: ProdutoRecargasForm) => {
      const user = await getUser();

      try {
        validateUser(user);

        if (!input.servicoId) {
          throw idError("servico");
        }

        if (!input.recargas) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produtoRecargas = await db.produto.create({
          data: {
            ...input,
            servicoId: input.servicoId,
            type: "recargas",
            recargas: {
              create: {
                ...input.recargas,
                montantes: {
                  createMany: {
                    data: input.recargas.montantes.map((m) => ({
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
            id: !!input.servicoId,
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

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.recargas) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            type: "recargas",
            recargas: {
              update: {
                data: {
                  desig_unidade: input.recargas.desig_unidade,
                  montantes: {
                    deleteMany: {
                      id: {
                        notIn: input.recargas.montantes
                          .filter((m) => m.id) // Only consider montantes with IDs
                          .map((m) => m.id!),
                      },
                    },
                    updateMany: input.recargas.montantes
                      .filter((m) => m.id) // Only update montantes with IDs
                      .map((m) => ({
                        where: { id: m.id },
                        data: {
                          montante: m.montante,
                          quantidade: m.quantidade,
                        },
                      })),
                    create: input.recargas.montantes
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
  },

  carregamento: {
    create: async (input: ProdutoCarregamentoForm) => {
      const user = await getUser();

      try {
        validateUser(user);

        if (!input.servicoId) {
          throw idError("servico");
        }

        if (!input.carregamento) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produtoCarregamento = await db.produto.create({
          data: {
            ...input,
            servicoId: input.servicoId,
            type: "carregamentos",
            carregamento: {
              create: {
                ...input.carregamento,
                montante_maximo:
                  input.carregamento.montante_tipo === "montante_pre_definido"
                    ? undefined
                    : input.carregamento.montante_maximo,
                montante_minimo:
                  input.carregamento.montante_tipo === "montante_pre_definido"
                    ? undefined
                    : input.carregamento.montante_minimo,
                montantes:
                  input.carregamento.montante_tipo === "montante_livre"
                    ? undefined
                    : {
                        createMany: {
                          data:
                            input.carregamento.montantes.map((m) => ({
                              montante: m.montante,
                              descricao: m.descricao,
                            })) || [],
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
            id: !!input.servicoId,
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

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.carregamento) {
          throw new Error("Não foi possível criar o produto.");
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            type: "carregamentos",
            carregamento: {
              update: {
                data: {
                  desig_referencia: input.carregamento.desig_referencia,
                  tamanho_referencia: input.carregamento.tamanho_referencia,
                  texto_ecra_referencia:
                    input.carregamento.texto_ecra_referencia,
                  montante_tipo: input.carregamento.montante_tipo,
                  montante_maximo:
                    input.carregamento.montante_tipo === "montante_pre_definido"
                      ? undefined
                      : input.carregamento.montante_maximo,
                  montante_minimo:
                    input.carregamento.montante_tipo === "montante_pre_definido"
                      ? undefined
                      : input.carregamento.montante_minimo,
                  montantes:
                    input.carregamento.montante_tipo === "montante_livre"
                      ? undefined
                      : {
                          deleteMany: {
                            id: {
                              notIn: input.carregamento.montantes
                                .filter((m) => m.id) // Only consider montantes with IDs
                                .map((m) => m.id!),
                            },
                          },
                          updateMany: input.carregamento.montantes
                            .filter((m) => m.id) // Only update montantes with IDs
                            .map((m) => ({
                              where: { id: m.id },
                              data: {
                                montante: m.montante,
                                descricao: m.descricao,
                              },
                            })),
                          create: input.carregamento.montantes
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
