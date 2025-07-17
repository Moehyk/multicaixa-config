export const sortDataArray = <T extends { montante: number }>(
  data: T[]
): T[] => {
  return data.sort((a, b) => a.montante - b.montante);
};
