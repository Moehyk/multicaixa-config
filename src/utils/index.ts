import { Geist, Geist_Mono } from "next/font/google";

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
