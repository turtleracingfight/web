import { create } from "zustand";
import { TError, TStoreError } from "../types/ts-store-errors.ts";

export const useStoreErrors = create<TStoreError>((set, get) => ({
  errors: [],
  createError: (error: TError) => {
    const isError = get().errors.find(el => el.text === error.text);
    if (isError) return;
    set(state => ({
      errors: [
        ...state.errors,
        { ...error, id: (Math.random() * 100).toString(34) }
      ]
    }));
  },
  removeError: (id: string) => {
    const errors = get().errors.length;
    if (!errors) return;
    set(state => ({ errors: state.errors.filter(el => el.id !== id) }));
  }
}));

export const createErrorStore = (error: TError) => {
  useStoreErrors.getState().createError(error);
};
