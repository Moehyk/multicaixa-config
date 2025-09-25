"use client";

import { motion } from "motion/react";

import { UnstyledButton } from "@mantine/core";

import type { McxSelectBtnProps } from "@/types";

export default function McxSelectBtn({
  onClick,
  selectKey,
  selectText,
  selectSecondarytext,
}: McxSelectBtnProps) {
  const isOdd = Number(selectKey) % 2 != 0;

  return (
    <motion.div
      initial={{ x: isOdd ? -100 : 100, opacity: 0 }}
      animate={{ x: isOdd ? 0 : 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <UnstyledButton
        className="flex items-center justify-between bg-white h-28 px-4 rounded border-[6px] border-solid border-blue-950 text-2xl font-bold w-full focus:bg-yellow-100 focus:outline-none"
        onClick={onClick}
      >
        {!isOdd && (
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

        {isOdd && (
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
    </motion.div>
  );
}
