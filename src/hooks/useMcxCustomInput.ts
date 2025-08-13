import { useMemo, useRef, useEffect } from "react";
import { RE_DIGIT } from "@/constants";

export const useMcxCustomInput = (value: string, valueLength: number) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (RE_DIGIT.test(char)) items.push(char);
      if (!RE_DIGIT.test(char)) items.push("");
    }

    return items;
  }, [value, valueLength]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return {
    valueItems,
    inputRefs,
  };
};
