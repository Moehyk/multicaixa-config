import { useMemo, useRef, useEffect } from "react";
import { RE_DIGIT } from "@/constants";

export const useMcxCustomInput = (value: string, valueLength: number) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: string[] = Array(valueLength).fill("");

    for (
      let i = valueLength - 1, j = valueArray.length - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      const char = valueArray[j];
      if (RE_DIGIT.test(char)) {
        items[i] = char;
      }
    }

    return items;
  }, [value, valueLength]);

  useEffect(() => {
    if (value === "") {
      setTimeout(() => {
        inputRefs.current[valueLength - 1]?.focus();
      }, 0);
    }
  }, [valueLength, value]);

  return {
    valueItems,
    inputRefs,
  };
};
