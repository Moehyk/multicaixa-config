import { Geist, Geist_Mono } from "next/font/google";
import { Prisma } from "@prisma/client";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const checkIfQueryParamsIsValid = (params: Record<string, any>) =>
  Object.values(params).every((value) => {
    if (value === null) {
      return false;
    }
    return true;
  });

export const getInvalidParamsMessage = (params: Record<string, any>) => {
  const invalidParams: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      invalidParams.push(key);
    }
  }

  invalidParams.length === 0 && invalidParams.push("nenhum");

  return `os seguintes parâmetros não foram submetidos: ${invalidParams.join(
    ", "
  )}`;
};

export const processUpsertError = (
  error: unknown,
  input: Record<string, any>
) => {
  const isValid = checkIfQueryParamsIsValid(input);

  if (!isValid) {
    const message = getInvalidParamsMessage(input);

    return {
      status: 400,
      message,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      // Include stack only in development
      ...(process.env.NODE_ENV === "development" && {
        debug: error instanceof Error ? error.stack : undefined,
      }),
    };
  } else {
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

    return {
      status: 500,
      message: "Ocorreu um erro ao processar sua solicitação",
      error: error instanceof Error ? error.message : "Erro desconhecido",
      // Include stack only in development
      ...(process.env.NODE_ENV === "development" && {
        debug: error instanceof Error ? error.stack : undefined,
      }),
    };
  }
};
