export const splitArray = <T>(
  arr: T[],
  firstArrLength: number,
  arrLength: number
): T[][] => {
  const firstArray = arr.slice(0, firstArrLength);
  const restOfArray = arr.slice(firstArrLength);
  const finalArray: T[][] = [firstArray];

  for (let i = 0; i < restOfArray.length; i += arrLength) {
    finalArray.push(restOfArray.slice(i, i + arrLength));
  }

  if (arr.length <= firstArrLength + 1) {
    return [[...arr]];
  }

  if (finalArray[finalArray.length - 1].length <= 1) {
    return [
      ...finalArray.filter((_, i) => i !== -2 && i !== -1),
      finalArray.splice(-2).flat(),
    ];
  }

  return finalArray;
};
