import { create } from "zustand";
import { OpenedContract, toNano } from "@ton/core";
import {
  CBet,
  ControlCenter
} from "../../build/ControlCenter/tact_ControlCenter.ts";
import { createErrorStore } from "./store-errors.ts";
import { LANGS } from "../constants/langs.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { setLoadingRequest } from "./store-loadings.ts";
import { IStoreContract, TSender } from "../types/ts-store-contract.ts";
import { getLang } from "./store-lang.ts";
import { AxiosError } from "axios";

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
    winner: BigInt(""),
    total: BigInt("")
  };

  const random = Math.ceil(Math.random() * 10);
  if (random <= 2)
    data.pnl = BigInt(
      Math.ceil(random * (random * Math.ceil(Math.random() * 100)) * 1000000) +
        100
    );

  for (const total in data) {
    const random = Math.ceil(Math.random() * 100);
    if (total.includes("total")) {
      data[total] = BigInt(
        Math.ceil(random * (random * Math.ceil(Math.random() * 100)) * 1000000)
      );
      data.total += data[total];
    }
  }

  for (const me in data) {
    const random = Math.floor(Math.random() * 10);
    if (
      me.includes("me") &&
      data[`total${me[2]}`] &&
      BigInt(data[`total${me[2]}`]) > 0
    ) {
      data[me] =
        random >= 4
          ? BigInt(
              Math.floor(
                Math.random() *
                  (random * Math.floor(Math.random() * 10)) *
                  100000000
              )
            )
          : BigInt("0");
    }
  }
  return data;
};
const timeToRequest = 500;
const testController = {
  getActiveId: (): Promise<number> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(10);
      }, timeToRequest);
    });
  },
  getNext: (): Promise<number> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(30);
      }, timeToRequest);
    });
  },
  getData: (id: number): Promise<{ [key: string]: BigInt }> => {
    return new Promise((resolve, reject) => {
      if (!id) reject(null);
      setTimeout(() => {
        resolve(helperReturnData());
      }, timeToRequest);
    });
  }
};

const notConnectWallet = () => {
  createErrorStore({
    text: LANGS[getLang()].notConnectedWallet,
    type: EnumHandlerError.ERROR
  });
};

export const useStoreContact = create<IStoreContract>((set, get) => ({
  activeId: null,
  id: null,
  winning: "0",
  contractCenter: null,
  sender: null,
  setContractCenter: (
    contractCenter: OpenedContract<ControlCenter>,
    sender: TSender
  ) => set({ contractCenter, sender }),
  getActiveId: async () => {
    try {
      if (!get().contractCenter) {
        notConnectWallet();
        return null;
      }
      setLoadingRequest(true);
      const data = await testController.getActiveId();
      if (data) {
        setLoadingRequest(false);
        if (!get().activeId) set({ activeId: data });
        return data;
      }
      setLoadingRequest(false);
      return null;
    } catch (error) {
      setLoadingRequest(false);
      createErrorStore({
        text: LANGS[getLang()].activeAddress,
        type: EnumHandlerError.ERROR
      });
    }
  },
  requestGetNext: async () => {
    try {
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      if (!get().contractCenter) {
        notConnectWallet();
        return {
          hours,
          minutes,
          seconds
        };
      }
      setLoadingRequest(true);
      const data = await testController.getNext();
      if (data) {
        hours = Math.floor(data / 3600);
        minutes = Math.floor((data % 3600) / 60);
        seconds = data % 60;
        setLoadingRequest(false);
        return { hours, minutes, seconds };
      }
      setLoadingRequest(false);
      return { hours, minutes, seconds };
    } catch (error) {
      setLoadingRequest(false);
      createErrorStore({
        text: LANGS[getLang()].nextTour,
        type: EnumHandlerError.ERROR
      });
    }
  },
  requestGetData: async (pastActiveId?: number) => {
    try {
      if (!get().contractCenter) {
        notConnectWallet();
        return null;
      }
      const id = pastActiveId || (await get().getActiveId());
      if (!id) return null;
      setLoadingRequest(true);
      const data = await testController.getData(id);
      setLoadingRequest(false);
      return data;
    } catch (error) {
      setLoadingRequest(false);
      const err = error as AxiosError;
      if (err.status === 504) {
        createErrorStore({
          text: LANGS[getLang()].lotRequest,
          type: EnumHandlerError.ERROR
        });
        return;
      }
      if (err.message.includes("Unable to execute get method")) {
        createErrorStore({
          text: LANGS[getLang()].beFirst,
          type: EnumHandlerError.SUCCESS
        });
      } else {
        createErrorStore({
          text: err.message,
          type: EnumHandlerError.ERROR
        });
      }
    }
  },
  requestMakeBet: async (value: number, turtleId: number) => {
    try {
      const contract = get().contractCenter;
      if (!contract || !get().sender) {
        notConnectWallet();
        return null;
      }
      contract?.send(
        get().sender as TSender,
        {
          value: toNano(value)
        },
        messageBet(turtleId)
      );
    } catch (error) {
      createErrorStore({
        text: LANGS[getLang()].failPlaceBet,
        type: EnumHandlerError.ERROR
      });
    }
  },
  takeWinningBet: () => {
    try {
      const contract = get().contractCenter;
      if (!contract || !get().sender) {
        notConnectWallet();
        return null;
      }
      const message = {
        $$type: "CPnl",
        id: get().id
      };
      contract?.send(
        get().sender as TSender,
        { value: toNano(get().winning) },
        message
      );
    } catch (error) {
      createErrorStore({
        text: LANGS[getLang()].failTakeWinningBet,
        type: EnumHandlerError.ERROR
      });
    }
  },
  setWinningBet: (id: number | null, winning: string, type?: string) => {
    if (type === "success") {
      const history = window.localStorage.getItem("history");
      if (history) {
        const parseHistory = JSON.parse(history);
        if (get().id !== null) {
          parseHistory[get().id as number] = {
            ...parseHistory[get().id as number],
            isWinning: true
          };
          window.localStorage.setItem("history", JSON.stringify(parseHistory));
        }
      }
    }
    set({ id, winning });
  }
}));
