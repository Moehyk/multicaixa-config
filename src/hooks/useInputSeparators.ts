import { useMemo } from "react";
import type { CustomInputValueType } from "@/types";

export const useInputSeparators = (
  length: number,
  valueType: CustomInputValueType
) =>
  useMemo(() => {
    if (valueType === "MONTANTE") {
      return {
        1: ".",
        4: ".",
        7: ",",
      };
    }

    const result: Record<number, string> = {};
    const groupSize = length >= 10 ? 4 : 3;

    for (let i = groupSize - 1; i < length - 1; i += groupSize) {
      if (length - i - 1 < groupSize / 2) break;
      result[i] = " ";
    }

    return result;
  }, [length, valueType]);
