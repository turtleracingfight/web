import axios from "axios";

import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { createErrorStore } from "../store/store-errors.ts";
import { REQUEST_TO_BALANCE } from "../constants/env.ts";
import { countTotalTon } from "../utils/usefulFunc.ts";
import { LANGS } from "../constants/langs.ts";
import { getLang } from "../store/store-lang.ts";
import { setIsLoadingBalance } from "../store/store-loadings.ts";
import { requestSetBalance } from '../store/store-contract.ts';

export const instance = axios.create({});

export const requestTon = {
  async getTonBalance(address: string): Promise<void> {
    try {
      setIsLoadingBalance(true);
      const { data } = await instance.get(`${REQUEST_TO_BALANCE}${address}`);
      if (data?.result) {
        requestSetBalance(countTotalTon(data.result));
        setIsLoadingBalance(false);
      } else {
        createErrorStore({
          text: LANGS[getLang()].failBalance,
          type: EnumHandlerError.ERROR
        });
        setIsLoadingBalance(false);
      }
    } catch (error) {
      setIsLoadingBalance(false);
      createErrorStore({
        text: LANGS[getLang()].failBalance,
        type: EnumHandlerError.ERROR
      });
    }
  }
};
