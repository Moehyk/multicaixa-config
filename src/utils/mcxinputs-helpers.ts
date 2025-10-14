import { amountFormatter } from "./amount-formatter";

export const renderMontanteText = (min: number | null, max: number | null) =>
  `Deve introduzir um montante entre ${
    min ? amountFormatter(min) : "[Montante Mínimo]"
  } e ${max ? amountFormatter(max) : "[Montante Máximo]"}`;

export const renderReferenciaText = (text: string) =>
  `Introduza o número de ${text}`;

export const generateMcxScreens = (screensNum: 2 | 3) => {
  const screensArr: number[] = new Array(screensNum);

  for (let i = 0; i < screensNum; i++) {
    screensArr[i] = i + 1;
  }

  return screensArr;
};
