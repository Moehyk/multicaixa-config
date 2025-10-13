"use client";

import { UnstyledButton } from "@mantine/core";

import type { McxSelectBtnProps } from "@/types";

function ButtonKey({ selectKey }: { selectKey: string }) {
  return (
    <div className="h-16 w-16 bg-mcx-btn-accent rounded flex justify-center items-center text-white text-3xl font-semibold">
      {selectKey}
    </div>
  );
}

export default function McxSelectBtn({
  onClick,
  selectKey,
  selectText,
  selectSecondarytext,
}: McxSelectBtnProps) {
  const isOdd = Number(selectKey) % 2 != 0;

  return (
    <UnstyledButton
      className={`flex items-center justify-between bg-mcx-btn-bg h-28 px-4 rounded border-[6px] border-solid border-mcx-btn-bd text-2xl font-bold w-full focus:bg-mcx-btn-focus focus:outline-none ${
        isOdd ? "animate-mcx-from-left" : "animate-mcx-from-right"
      }`}
      onClick={onClick}
    >
      {!isOdd && (
        <>
          <div>
            <p> {selectText}</p>
            <p> {selectSecondarytext}</p>
          </div>
          <ButtonKey selectKey={selectKey} />
        </>
      )}

      {isOdd && (
        <>
          <ButtonKey selectKey={selectKey} />
          <div className="text-end">
            <p> {selectText}</p>
            <p> {selectSecondarytext}</p>
          </div>
        </>
      )}
    </UnstyledButton>
  );
}
