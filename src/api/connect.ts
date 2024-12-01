import axios, { AxiosError } from "axios";

import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { createErrorStore } from "../store/store-errors.ts";
import { REQUEST_TO_BALANCE } from "../constants/env.ts";

export const instance = axios.create({});

export const requestTon = {
  async getTonBalance(
    address: string,
    set: (balance: number) => void,
    loading: (value: boolean) => void
  ): Promise<void> {
    try {
      const { data } = await instance.get(`${REQUEST_TO_BALANCE}${address}`);
      if (data?.result) {
        const ton = data.result / 10 ** 9;
        set(Math.floor(ton * 100) / 100);
        loading(false);
      } else {
        alert("Отсутствует баланс по указанному адресу");
        loading(false);
      }
    } catch (error) {
      loading(false);
      const err = error as AxiosError;
      createErrorStore({ text: err.message, type: EnumHandlerError.ERROR });
    }
  }
};
