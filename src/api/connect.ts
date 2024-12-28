import axios from "axios";

import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { createErrorStore } from "../store/store-errors.ts";
import { REQUEST_TO_BALANCE } from "../constants/env.ts";
import { countTotalTon } from "../utils/usefulFunc.ts";
import { LANGS } from "../constants/langs.ts";
import { getLang } from "../store/store-lang.ts";

export const instance = axios.create({});

export const requestTon = {
  async getTonBalance(
    address: string,
    set: (balance: string) => void,
    loading: (value: boolean) => void
  ): Promise<void> {
    try {
      loading(true);
      const { data } = await instance.get(`${REQUEST_TO_BALANCE}${address}`);
      if (data?.result) {
        set(countTotalTon(data.result));
        loading(false);
      } else {
        createErrorStore({
          text: LANGS[getLang()].failBalance,
          type: EnumHandlerError.ERROR
        });
        loading(false);
      }
    } catch (error) {
      loading(false);
      createErrorStore({
        text: LANGS[getLang()].failBalance,
        type: EnumHandlerError.ERROR
      });
    }
  }
};
