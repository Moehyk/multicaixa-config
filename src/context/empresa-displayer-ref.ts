import { RefObject } from "react";
import { create } from "zustand";

export const empresaDisplayerRefStore = create<{
  ref: RefObject<HTMLDivElement | null>;
}>(() => ({
  ref: { current: null },
}));
