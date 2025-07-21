import { errorIdMessage } from "@/config";

import { DataModel } from "@/types";
import { Prisma } from "@prisma/client";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const idError = (data: DataModel) => {
  return new Error(`${errorIdMessage[data]}`, {
    cause: `${data}Id inválido`,
  });
};

export const validateUser = (user: KindeUser<Record<string, any>>) => {
  if (!user) {
    throw new Error("Não autorizado", { cause: "erro de autenticação" });
  }
};

export const processErrors = (
  error: Error,
  validation: {
    noId: boolean;
    existentId?: boolean;
    invalidInput?: boolean;
    user: KindeUser<Record<string, any>>;
  }
) => {
  console.error("Error Stack:", error.stack);
  console.error("Error Details:", {
    message: error.message,
    name: error.name,
    cause: error.cause,
  });

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Error Code:", error.code);
    console.error("Prisma Meta:", error.meta);
  }

  if (!validation.user) {
    return {
      status: 403,
      message: error.message,
      error,
    };
  }

  if (!validation.noId) {
    return {
      status: 404,
      message: error.message,
      error,
    };
  }

  if (validation.existentId) {
    return {
      status: 409,
      message: error.message,
      error,
    };
  }

  if (validation.invalidInput) {
    return {
      status: 400,
      message: error.message,
      error,
    };
  }
};
