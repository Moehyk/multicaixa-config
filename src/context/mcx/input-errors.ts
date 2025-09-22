import { create } from "zustand";

import type { RefObject } from "react";

import type { InputErrorsStore, InputRefsStore } from "@/types";

export const useInputErrorsStore = create<InputErrorsStore>((set) => ({
  referenciaError: false,
  montanteError: false,
  setMontError: (value: boolean) => set({ montanteError: value }),
  setRefError: (value: boolean) => set({ referenciaError: value }),
}));

export const useInputRefsStore = create<InputRefsStore>((set) => ({
  inputRefs: null,
  setInputRefs: (value: RefObject<HTMLInputElement[]>) =>
    set({ inputRefs: value }),
}));

export const setInputMontanteError =
  useInputErrorsStore.getState().setMontError;

export const setInputReferenciaError =
  useInputErrorsStore.getState().setRefError;

export const setInputRefs = useInputRefsStore.getState().setInputRefs;
