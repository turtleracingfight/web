export interface IStoreLoadings {
  isLoadingContract: boolean;
  isLoadingRequest: boolean;
  setLoadingContract: (isLoadingController: boolean) => void;
  setLoadingRequest: (isLoadingRequest: boolean) => void;
}
