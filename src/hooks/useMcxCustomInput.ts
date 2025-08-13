import { useMemo, useRef } from "react";

export const useMcxCustomInput = (value: string, valueLength: number) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (char.length > 0) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  return {
    valueItems,
    inputRefs,
  };
};
