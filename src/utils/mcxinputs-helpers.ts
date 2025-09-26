import { amountFormatter } from "./amount-formatter";

export const renderMontanteText = (min: number, max: number) =>
  `Deve introduzir um montante entre ${amountFormatter(
    min
  )} e ${amountFormatter(max)}`;

export const renderReferenciaText = (text: string) =>
  `Introduza o número de ${text}`;

export const generateMcxScreens = (screensNum: 2 | 3) => {
  const screensArr: number[] = new Array(screensNum);

  for (let i = 0; i < screensNum; i++) {
    screensArr[i] = i + 1;
  }

  return screensArr;
};
