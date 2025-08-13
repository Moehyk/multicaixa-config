import { ChangeEvent, FocusEvent, KeyboardEvent, Fragment } from "react";
import { useMcxCustomInput } from "@/hooks/useMcxCustomInput";
import { RE_DIGIT } from "@/constants";

import { Input } from "@mantine/core";
import classes from "./PagamentoInput.module.css";

export default function McxPagamentoInput({
  onChange,
  value,
  valueLength,
}: {
  value: string;
  valueLength: number;
  onChange: (combinedOtp: string) => void;
}) {
  const { valueItems, inputRefs } = useMcxCustomInput(value, valueLength);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();

    if (targetValue && !RE_DIGIT.test(targetValue)) {
      target.value = valueItems[idx] || ""; // Revert to current value
      return;
    }

    const newDigit = targetValue.slice(-1);
    target.value = newDigit; // Ensure only one digit is shown

    const newValue =
      value.substring(0, idx) + newDigit + value.substring(idx + 1);

    onChange(newValue);

    if (targetValue && idx < valueLength - 1) {
      // Add timeout to ensure state updates before focus change
      setTimeout(() => inputRefs.current[idx + 1]?.focus(), 0);
    }
  };

  const inputOnKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (e.currentTarget.value) {
        const newValue =
          value.substring(0, index) + " " + value.substring(index + 1);
        onChange(newValue);
      } else if (index > 0) {
        const newValue =
          value.substring(0, index - 1) + " " + value.substring(index);
        onChange(newValue);
        setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
      }
    }
  };

  const inputOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="flex gap-1 items-end">
      {valueItems.map((value, i) => (
        <Fragment key={`keyOfIndex-${i}`}>
          <Input
            type="text"
            size="lg"
            pattern="\d{1}"
            maxLength={valueLength}
            inputMode="numeric"
            autoComplete="one-time-code"
            value={value}
            ref={(el) => {
              if (el) inputRefs.current[i] = el;
            }}
            onChange={(e) => inputOnChange(e, i)}
            onKeyDown={(e) => inputOnKeyDown(e, i)}
            onFocus={inputOnFocus}
            classNames={{
              input: classes.input,
              wrapper: classes.wrapper,
            }}
          />
          {i === 1 && (
            <span className="text-white text-4xl px-2 self-center">,</span>
          )}
          {i === 4 && (
            <span className="text-white text-4xl px-2 self-center">,</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
