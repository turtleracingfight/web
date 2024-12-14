import { useAccount } from "./useAccount.tsx";
import {
  CBet,
  ControlCenter
} from "../../build/ControlCenter/tact_ControlCenter.ts";
import { useAsyncInitialize } from "./useInitial.tsx";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useEffect, useState } from "react";
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { AxiosError } from "axios";
import { useLang } from "./useLang.tsx";
import { LANGS } from "../constants/langs.ts";

const messageBet = (turtleId: number): CBet => {
  return {
    turtleNumber: BigInt(turtleId),
    $$type: "CBet"
  };
};

const helperReturnData = () => {
  const data = {
    me1: BigInt(""),
    me2: BigInt(""),
    me3: BigInt(""),
    me4: BigInt(""),
    me5: BigInt(""),
    me6: BigInt(""),
    me7: BigInt(""),
    me8: BigInt(""),
    me9: BigInt(""),
    me10: BigInt(""),
    total1: BigInt(""),
    total2: BigInt(""),
    total3: BigInt(""),
    total4: BigInt(""),
    total5: BigInt(""),
    total6: BigInt(""),
    total7: BigInt(""),
    total8: BigInt(""),
    total9: BigInt(""),
    total10: BigInt(""),
    pnl: BigInt(""),
    winner: BigInt("")
  };
  for (const total in data) {
    const random = Math.floor(Math.random() * 10);
    if (total.includes("total"))
      data[total] =
        random >= 4
          ? BigInt(
              Math.floor(
                Math.random() *
                  (random * Math.floor(Math.random() * 10)) *
                  10000000000
              )
            )
          : "0";
  }
  for (const me in data) {
    const random = Math.floor(Math.random() * 10);
    if (
      me.includes("me") &&
      data[`total${me[2]}`] &&
      BigInt(data[`total${me[2]}`]) > 0
    ) {
      data[me] =
        random >= 5
          ? BigInt(
              Math.floor(
                Math.random() *
                  (random * Math.floor(Math.random() * 10)) *
                  100000000
              )
            )
          : "0";
    }
  }
  return data;
};
const timeToRequest = 2000;
const testController = {
  getActiveId: (): Promise<{ data: number; status: number }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: 5, status: 200 });
      }, timeToRequest);
    });
  },
  getNext: (): Promise<{ data: number; status: number }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: 3005, status: 200 });
      }, timeToRequest);
    });
  },
  getData: (
    id: number
  ): Promise<{ data: { [key: string]: BigInt } | null; status: number }> => {
    return new Promise((resolve, reject) => {
      if (!id) reject({ data: null, status: 204 });
      setTimeout(() => {
        resolve({ data: helperReturnData(), status: 200 });
      }, timeToRequest);
    });
  }
};

let time = 0;
let firstBet = false;
const CONTRACT = "EQA28ww30J6zjj1IoU_fCOkqP53A3Cit5LzztpaZmcTcl0t2";
export const useControlCenter = () => {
  const { lang } = useLang();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRequest, setIsRequest] = useState(false);
  const { address, sender, client, setOptions } = useAccount();

  const controlCenter = useAsyncInitialize(async () => {
    if (!client || !address) return;
    const contract = ControlCenter.fromAddress(Address.parse(CONTRACT));
    return client.open(contract) as OpenedContract<ControlCenter>;
  }, [client, address]);

  const helperLoadedAcc = () => {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  };

  useEffect(() => {
    if (address && controlCenter) setIsLoaded(false);
    else helperLoadedAcc();
  }, [address, controlCenter]);

  const requestGetActiveId = async () => {
    try {
      setIsRequest(true);
      const { data } = await testController.getActiveId();
      if (data) {
        setIsRequest(false);
        return data;
      }
      setIsRequest(false);
      return null;
    } catch (error) {
      setIsRequest(false);
      createErrorStore({
        text: LANGS[lang].activeAddress,
        type: EnumHandlerError.ERROR
      });
    }
  };

  const requestGetNext = async () => {
    try {
      setIsRequest(true);
      const { data } = await testController.getNext();
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      if (data) {
        hours = Math.floor(data / 3600);
        minutes = Math.floor((data % 3600) / 60);
        seconds = data % 60;
        setIsRequest(false);
        return { hours, minutes, seconds };
      }
      setIsRequest(false);
      return { hours, minutes, seconds };
    } catch (error) {
      setIsRequest(false);
      createErrorStore({
        text: LANGS[lang].nextTour,
        type: EnumHandlerError.ERROR
      });
    }
  };

  const requestGetData = async () => {
    try {
      const id = await requestGetActiveId();
      if (!id) return;
      setIsRequest(true);
      const { data } = await testController.getData(id);
      return data;
    } catch (error) {
      setIsRequest(false);
      const err = error as AxiosError;
      if (err.status === 504) {
        createErrorStore({
          text: LANGS[lang].lotRequest,
          type: EnumHandlerError.ERROR
        });
        return;
      }
      if (err.message.includes("Unable to execute get method") && !firstBet) {
        firstBet = true;
        createErrorStore({
          text: LANGS[lang].beFirst,
          type: EnumHandlerError.SUCCESS
        });
      } else {
        createErrorStore({
          text: err.message,
          type: EnumHandlerError.ERROR
        });
      }
    }
  };

  const requestMakeBet = (value: number, turtleId: number) => {
    try {
      controlCenter?.send(
        sender,
        {
          value: toNano(value)
        },
        messageBet(turtleId)
      );
    } catch (error) {
      createErrorStore({
        text: LANGS[lang].failPlaceBet,
        type: EnumHandlerError.ERROR
      });
    }
  };

  return {
    requestGetData,
    requestGetNext,
    requestMakeBet,
    requestGetActiveId,
    isControllerLoading: isLoaded,
    address,
    isRequest,
    setOptions
  };
};
