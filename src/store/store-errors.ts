import { create } from "zustand";
import { TError, TStoreError } from "../types/ts-store-errors.ts";

export const useStoreErrors = create<TStoreError>(set => ({
  errors: [


  ],
  createError: (error: TError) =>
    set(state => ({
      errors: [...state.errors, { ...error, id: state.errors.length + 1 }]
    })),
  removeError: (id: number) =>
    set(state => ({ errors: state.errors.filter(el => el.id !== id) }))
}));

export const createErrorStore = (error: TError) => {
  useStoreErrors().createError(error);
};
