export type TStoreError = {
  errors: TError[];
  createError: (value: TError) => void;
  removeError: (id: string) => void;
};

export type TError = {
  id?: string;
  text: string;
  type: EnumHandlerError;
};

export enum EnumHandlerError {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

export type TErrorItem = {
  img: string;
  name: string;
  id: string;
  text: string;
  removeError: (id: string) => void;
  color: string;
  type: EnumHandlerError;
};
