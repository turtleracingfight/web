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
import { DEFAULT_PNL } from "../constants/constants-fields.ts";

const messageBet = (turtleId: number): CBet => {
  return {
    turtleNumber: BigInt(turtleId),
    $$type: "CBet"
  };
};
const delay = ms => new Promise(res => setTimeout(res, ms));
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
  expiredActiveId: null,
  expiredData: null,
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
      let activeAddress = window.localStorage.getItem("activeAddress");
      let expiredActiveId = window.localStorage.getItem("expiredActiveId");
      if (expiredActiveId != null && activeAddress != null) {
        let seconds = +expiredActiveId;
        console.log("expiredActiveId", expiredActiveId);
        if (new Date().getTime() < seconds) {
          console.log("getting address");
          return activeAddress;
        }
      }
      setLoadingRequest(true);
      const address = await contract.getTournamentActive();
      if (address) {
        console.log("setting address");
        window.localStorage.setItem("activeAddress", address.toString());
        return address;
      }
      setLoadingRequest(false);
      return;
    } catch (error) {
      console.log(error);
      setLoadingRequest(false);
      createErrorStore({
        text: LANGS[getLang()].activeAddress,
        type: EnumHandlerError.ERROR
      });
    }
  },
  getActiveId: async () => {
    for (let i = 1; i < 10; i++) {
      try {
        const contract = get().contractCenter;
        if (!contract) {
          notConnectWallet();
          return;
        }
        let id = window.localStorage.getItem("activeId");
        let expiredActiveId = window.localStorage.getItem("expiredActiveId");
        if (id != null && expiredActiveId != null) {
          if (new Date().getTime() < expiredActiveId) {
            console.log("getting activeID");
            let activeId = +String(id);
            set({ activeId });
            return;
          }
        }
        setLoadingRequest(true);
        const data = await contract.getActiveId();
        if (data) {
          const activeId = +String(data);
          setLoadingRequest(false);
          console.log("setting activeID");
          window.localStorage.setItem("activeId", activeId.toString());
          set({ activeId });
          return activeId;
        }
        setLoadingRequest(false);
        return;
      } catch (error) {
        console.log(error);
        await delay(i * 1000);
        setLoadingRequest(false);
        createErrorStore({
          text: LANGS[getLang()].activeAddress,
          type: EnumHandlerError.ERROR
        });
      }
    }
  },
  requestGetNext: async () => {
    for (let i = 0; i < 10; i++) {
      try {
        const contract = get().contractCenter;
        if (!contract) {
          notConnectWallet();
          return 0;
        }
        setLoadingRequest(true);
        const data = await contract.getNext();
        setLoadingRequest(false);
        if (data) {
          console.log("setting expired");
          let seconds = +data.toString();
          window.localStorage.setItem(
            "expiredActiveId",
            (new Date().getTime() + seconds).toString()
          );
          return +data.toString();
        }
        return 0;
      } catch (error) {
        await delay(i * 1000);
        setLoadingRequest(false);
        createErrorStore({
          text: LANGS[getLang()].nextTour,
          type: EnumHandlerError.ERROR
        });
      }
    }
  },
  requestGetHistoryData: async (
    currentId: number
  ): Promise<TResultBets | undefined> => {
    const { contractCenter, getActiveId, userAddress, client } = get();
    if (!contractCenter || !userAddress || !client) {
      notConnectWallet();
      return;
    }
    const id = currentId || (await getActiveId()) || 0;
    if (id != (await getActiveId())) {
      let data = window.localStorage.getItem("data" + id);
      if (data != undefined) {
        console.log("return data", data);
        return JSON.parse(data);
      }
    }
    try {
      console.log("getting history for", id);
      setLoadingRequest(true);
      const prevAddress = await contractCenter.getTournamentAddress(BigInt(id));
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
      console.log("find winner", result.winner.toString());
      let res = JSON.parse(
        JSON.stringify(
          result,
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        )
      );
      if (res.winner == 0) {
        let min = 99999999999999;
        let winner = 0;
        for (let i = 1; i < 11; i++) {
          let current = +String(res["total" + i].toString());
          if (current != 0 && current < min) {
            min = current;
            winner = i;
            console.log("winner", i);
          }
        }
        let total = (res.total / 100) * 90;
        let percent = res["me" + winner] / res["total" + winner];
        res.pnl = total * percent;
        res.winner = winner;
      }
      setLoadingRequest(false);
      window.localStorage.setItem("data" + id, JSON.stringify(res));
      return res;
    } catch (error) {
      if (error.message == "Unable to execute get method. Got exit_code: -13") {
        const data = JSON.stringify(
          helperReturnData(),
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        );
        window.localStorage.setItem("data" + id, data);
        setLoadingRequest(false);
        return JSON.parse(data);
      }
      setLoadingRequest(false);
      const err = error as AxiosError;
      if (err.status === 504) {
        createErrorStore({
          text: LANGS[getLang()].lotRequest,
          type: EnumHandlerError.ERROR
        });
        return;
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
      let data = window.localStorage.getItem("data");
      let expirderData = window.localStorage.getItem("expiredData");
      if (data != null && expirderData != null) {
        if (new Date().getTime() < +String(expirderData)) {
          console.log("get data");
          return JSON.parse(data);
        }
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
      console.log("set data");
      window.localStorage.setItem(
        "expiredData",
        (new Date().getTime() + 15000).toString()
      );
      window.localStorage.setItem(
        "data",
        JSON.stringify(
          result,
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        )
      );
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
      const { contractCenter, sender, id } = get();
      if (!contractCenter || !sender) {
        notConnectWallet();
        return null;
      }
      if (!id) {
        createErrorStore({
          text: LANGS[getLang()].cancelledTakeWinning,
          type: EnumHandlerError.ERROR
        });
      }
      console.log(id, "takeWinningBetID");
      const messageCPnl = {
        $$type: "CPnl",
        id: BigInt(id as number)
      };
      contractCenter?.send(
        get().sender as TSender,
        { value: toNano(DEFAULT_PNL) },
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
      const dataId = get().id;
      if (dataId !== null) {
        const history = window.localStorage.getItem("data" + dataId);
        if (history) {
          const parseHistory = JSON.parse(history);
          parseHistory["isWinning"] = true;
          window.localStorage.setItem(
            "data" + dataId,
            JSON.stringify(parseHistory)
          );
        }
      }
    }
    set({ id, winning });
  }
}));
