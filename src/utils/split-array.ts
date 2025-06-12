export const splitArray = <T>(
  arr: T[],
  firstArrLength: number,
  arrLength: number
): T[][] => {
  if (arr.length <= firstArrLength + 1) {
    return [[...arr]];
  }

  const firstArray = arr.slice(0, firstArrLength);
  const restOfArray = arr.slice(firstArrLength);
  const finalArray: T[][] = [firstArray];

  for (let i = 0; i < restOfArray.length; i += arrLength) {
    finalArray.push(restOfArray.slice(i, i + arrLength));
  }

  if (finalArray[finalArray.length - 1].length <= 1) {
    const previousArrays = finalArray.slice(0, -2);
    const lastCombinedArray = finalArray.splice(-2).flat();

    return [...previousArrays, lastCombinedArray];
  }

  return finalArray;
};
