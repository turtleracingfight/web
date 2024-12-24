import { create } from "zustand";
import { IStoreLoadings } from "../types/ts-store-loadings.ts";

export const useStoreLoadings = create<IStoreLoadings>(set => ({
  isLoadingContract: true,
  isLoadingRequest: false,
  setLoadingContract: (isLoadingContract: boolean) =>
    set({ isLoadingContract }),
  setLoadingRequest: (isLoadingRequest: boolean) => set({ isLoadingRequest })
}));

export const setLoadingRequest = (isLoadingRequest: boolean) => {
  useStoreLoadings.getState().setLoadingRequest(isLoadingRequest);
};
