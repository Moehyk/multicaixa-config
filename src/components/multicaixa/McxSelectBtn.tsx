import React from "react";

import { UnstyledButton } from "@mantine/core";

export default function McxSelectBtn({
  clickHandler,
  selectKey,
  selectText,
  selectSecondarytext,
}: {
  clickHandler: () => void;
  selectKey: string;
  selectText: string;
  selectSecondarytext?: string;
}) {
  return (
    <UnstyledButton
      className="flex items-center justify-between bg-white h-28 px-4 rounded border-[6px] border-solid border-blue-950 text-2xl font-bold"
      onClick={clickHandler}
    >
      {Number(selectKey) % 2 == 0 && (
        <>
          <div>
            <p> {selectText}</p>
            <p> {selectSecondarytext}</p>
          </div>
          <div className="h-16 w-16 bg-orange-400 rounded flex justify-center items-center text-white text-3xl font-semibold">
            {selectKey}
          </div>
        </>
      )}

      {Number(selectKey) % 2 != 0 && (
        <>
          <div className="h-16 w-16 bg-orange-400 rounded flex justify-center items-center text-white text-3xl font-semibold">
            {selectKey}
          </div>
          <div className="text-end">
            <p> {selectText}</p>
            <p> {selectSecondarytext}</p>
          </div>
        </>
      )}
    </UnstyledButton>
  );
}
