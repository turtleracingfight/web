export interface IStoreLoadings {
  isLoadingContract: boolean;
  isLoadingRequest: boolean;
  isLoadingBalance: boolean;
  setLoadingContract: (isLoadingController: boolean) => void;
  setLoadingRequest: (isLoadingRequest: boolean) => void;
}
