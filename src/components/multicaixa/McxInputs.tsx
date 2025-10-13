import { ChangeEvent, FocusEvent, KeyboardEvent, Fragment } from "react";
import { useMcxCustomInput, useInputSeparators } from "@/hooks";

import { RE_DIGIT } from "@/constants";

import { Input } from "@mantine/core";

import { CustomInputValueType, McxInputsProps } from "@/types";
import classes from "./Inputs.module.css";

function Separators({
  index,
  valueLength,
  valueType,
}: {
  index: number;
  valueLength: number;
  valueType: CustomInputValueType;
}) {
  const separators = useInputSeparators(valueLength, valueType);

  if (separators[index]) {
    return (
      <span className="text-white text-4xl px-2 self-center">
        {separators[index]}
      </span>
    );
  }

  return null;
}

export default function McxInputs({
  onChange,
  value,
  valueLength,
  valueType,
}: McxInputsProps) {
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
        const newValue = [...valueItems];
        newValue[index] = "";
        onChange(newValue.join(""));
      } else if (index < valueLength - 1) {
        setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
      }
    }
  };

  const inputOnFocus = (e: FocusEvent<HTMLInputElement>) =>
    e.target.setSelectionRange(0, e.target.value.length);

  return (
    <div className="bg-mcx-bg-accent w-full  mb-4 py-12 rounded flex flex-col items-center">
      <div className="flex flex-col items-stretch">
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
              <Separators
                index={i}
                valueLength={valueLength}
                valueType={valueType}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
