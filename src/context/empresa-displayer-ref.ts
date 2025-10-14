import { RefObject } from "react";
import { create } from "zustand";

export const empresaDisplayerRefStore = create<{
  ref: RefObject<HTMLElement | null>;
}>(() => ({
  ref: { current: null },
}));
