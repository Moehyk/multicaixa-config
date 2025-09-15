export const amountFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat("pt-BR");

  return `${formatter.format(amount)} KZS`;
};

export const amountFractionFormatter = (amount: number) => {
  const amountAsDecimal = amount / 100;
  const formatter = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return `${formatter.format(amountAsDecimal)} KZS`;
};

export const manualAmountFormatter = (amount: string) => {
  let paddedStr = amount.padStart(3, "0");

  const integerPart = paddedStr.slice(0, -2);
  let decimalPart = paddedStr.slice(-2);

  let formattedInteger = "";
  for (let i = integerPart.length - 1, counter = 0; i >= 0; i--) {
    formattedInteger = integerPart[i] + formattedInteger;
    counter++;

    if (counter % 3 === 0 && i !== 0) {
      formattedInteger = "." + formattedInteger;
    }
  }

  return `${formattedInteger}.${decimalPart}`;
};
