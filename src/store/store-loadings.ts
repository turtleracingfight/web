import { create } from "zustand";
import { IStoreLoadings } from "../types/ts-store-loadings.ts";

export const useStoreLoadings = create<IStoreLoadings>(set => ({
  isLoadingContract: true,
  isLoadingRequest: false,
  isLoadingBalance: true,
  setLoadingContract: (isLoadingContract: boolean) =>
    set({ isLoadingContract }),
  setLoadingRequest: (isLoadingRequest: boolean) => set({ isLoadingRequest })
}));

export const setLoadingRequest = (isLoadingRequest: boolean) => {
  useStoreLoadings.getState().setLoadingRequest(isLoadingRequest);
};

export const setIsLoadingBalance = (isLoadingBalance: boolean) =>
  useStoreLoadings.setState({ isLoadingBalance });
