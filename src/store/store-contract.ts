import { create } from "zustand";
import { Address, OpenedContract, toNano } from "@ton/core";
import {
  CBet,
  ControlCenter
} from "../../build/ControlCenter/tact_ControlCenter.ts";
import { createErrorStore } from "./store-errors.ts";
import { LANGS } from "../constants/langs.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { setLoadingRequest } from "./store-loadings.ts";
import {
  ETakeWinning,
  IStoreContract,
  TSender
} from "../types/ts-store-contract.ts";
import { getLang } from "./store-lang.ts";
import { AxiosError } from "axios";
import { TResultBets } from "../types/ts-common.ts";
import { Turtle } from "../../build/Turtle/tact_Turtle.ts";

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
        resolve(20);
      }, timeToRequest);
    });
  },
  getNext: (): Promise<number> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(3605);
      }, timeToRequest);
    });
  },
  getData: (id: number): Promise<TResultBets> => {
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
  userAddress: "",
  client: undefined,
  setContractCenter: (
    contractCenter: OpenedContract<ControlCenter>,
    sender: TSender,
    address: string,
    client
  ) => set({ contractCenter, sender, userAddress: address, client }),
  getActiveTour: async () => {
    try {
      const contract = get().contractCenter;
      if (!contract) {
        notConnectWallet();
        return;
      }
      setLoadingRequest(true);
      const address = await contract.getTournamentActive();
      if (address) return address;
      setLoadingRequest(false);
      return;
    } catch (error) {
      setLoadingRequest(false);
      createErrorStore({
        text: LANGS[getLang()].activeAddress,
        type: EnumHandlerError.ERROR
      });
    }
  },
  getActiveId: async () => {
    try {
      const contract = get().contractCenter;
      if (!contract) {
        notConnectWallet();
        return;
      }
      setLoadingRequest(true);
      const data = await contract.getActiveId();
      if (data) {
        const activeId = +String(data);
        setLoadingRequest(false);
        if (!get().activeId) set({ activeId });
        return activeId;
      }
      setLoadingRequest(false);
      return;
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
      const contract = get().contractCenter;
      if (!contract) {
        notConnectWallet();
        return 0;
      }
      setLoadingRequest(true);
      const data = await contract.getNext();
      if (data) return +data.toString();
      setLoadingRequest(false);
      return 0;
    } catch (error) {
      setLoadingRequest(false);
      createErrorStore({
        text: LANGS[getLang()].nextTour,
        type: EnumHandlerError.ERROR
      });
    }
  },
  requestGetHistoryData: async (
    currentId: number
  ): Promise<TResultBets | undefined> => {
    try {
      const { contractCenter, getActiveId, userAddress, client } = get();
      if (!contractCenter || !userAddress || !client) {
        notConnectWallet();
        return;
      }
      setLoadingRequest(true);
      console.log(currentId, "currentId");
      const id = currentId || (await getActiveId()) || 0;
      console.log(id, "id");
      const prevAddress = await contractCenter.getTournamentAddress(BigInt(id));
      console.log(prevAddress, "prevAddress");
      if (!prevAddress) {
        createErrorStore({
          text: LANGS[getLang()].prevAddress,
          type: EnumHandlerError.ERROR
        });
        setLoadingRequest(false);
        return;
      }
      const contractTurtle = Turtle.fromAddress(
        Address.parse(String(prevAddress))
      );
      const turtle = client.open(contractTurtle) as OpenedContract<Turtle>;
      const result = await turtle?.getData(Address.parse(userAddress));
      console.log(result, "resultresultresult");
      setLoadingRequest(false);
      return result;
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
        const history = window.localStorage.getItem("history") || {};
        const id = currentId || get().id || 0;
        const parsedHistory =
          typeof history === "string" ? JSON.parse(history) : {};
        parsedHistory[id] = {};
        window.localStorage.setItem("history", JSON.stringify(parsedHistory));
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
  requestGetData: async (): Promise<TResultBets | undefined> => {
    try {
      const { contractCenter, getActiveTour, userAddress, client } = get();
      if (!contractCenter || !userAddress || !client) {
        notConnectWallet();
        return;
      }
      const activeAddress = await getActiveTour();
      if (!activeAddress) return;
      setLoadingRequest(true);
      const contractTurtle = Turtle.fromAddress(
        Address.parse(String(activeAddress))
      );
      const turtle = client.open(contractTurtle) as OpenedContract<Turtle>;
      const result = await turtle?.getData(Address.parse(userAddress));
      setLoadingRequest(false);
      return result;
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
  requestTakeWinningBet: () => {
    try {
      const contract = get().contractCenter;
      if (!contract || !get().sender) {
        notConnectWallet();
        return null;
      }
      const messageCPnl = {
        $$type: "CPnl",
        id: get().id
      };
      contract?.send(
        get().sender as TSender,
        { value: toNano(get().winning) },
        messageCPnl
      );
    } catch (error) {
      createErrorStore({
        text: LANGS[getLang()].cancelledTakeWinning,
        type: EnumHandlerError.ERROR
      });
    }
  },
  setWinningBet: (id: number | null, winning: string, type?: string) => {
    if (type === ETakeWinning.takeWinning) {
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
