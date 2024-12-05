export type TStoreError = {
  errors: TError[];
  createError: (value: TError) => void;
  removeError: (id: number) => void;
};

export type TError = {
  id?: number;
  text: string;
  type: EnumHandlerError;
};

export enum EnumHandlerError {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}
