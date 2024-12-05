import { useAccount } from "./useAccount.tsx";
import {
  CBet,
  ControlCenter
} from "../../build/ControlCenter/tact_ControlCenter.ts";
import { useAsyncInitialize } from "./useInitial.tsx";
import { Address, OpenedContract, toNano } from "@ton/core";
import { Turtle } from "../../build/Turtle/tact_Turtle.ts";
import { useEffect, useState } from "react";
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { AxiosError } from "axios";

const messageBet = (turtleId: number): CBet => {
  return {
    turtleNumber: BigInt(turtleId),
    $$type: "CBet"
  };
};

let time = 0;
const CONTRACT = "EQA28ww30J6zjj1IoU_fCOkqP53A3Cit5LzztpaZmcTcl0t2";
export const useControlCenter = () => {
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

  const requestActiveAddress = async () => {
    try {
      setIsRequest(true);
      const address = await controlCenter?.getTournamentActive();
      setIsRequest(false);
      return address?.toString();
    } catch (error) {
      setIsRequest(false);
      createErrorStore({
        text: "Неудалось получить активный адрес турнира",
        type: EnumHandlerError.ERROR
      });
    }
  };

  // const initActiveAddress = async (): Promise<null | string> => {
  //   const todayAddress = await requestActiveAddress();
  //   const parsedTodayAddress = todayAddress.toString();
  //   let activeAddress: string | null =
  //     window.localStorage.getItem("activeAddress");
  //   if (activeAddress) {
  //     const parsedAddress = JSON.parse(activeAddress) as string || ''
  //     if (todayAddress && parsedAddress !== todayAddress.toString()) {
  //       if (parsedTodayAddress) {
  //         window.localStorage.setItem(
  //           "activeAddress",
  //           JSON.stringify(parsedTodayAddress)
  //         );
  //       }
  //     }
  //     return parsedTodayAddress
  //   }
  //   const address = await requestActiveAddress();
  //   if (address) {
  //     window.localStorage.setItem(
  //       "activeAddress",
  //       JSON.stringify({ address: address.toString(), date: today })
  //     );
  //     activeAddress = address.toString();
  //   }
  //   return activeAddress;
  // };

  const requestIsData = async (turtle: OpenedContract<Turtle>) => {
    try {
      const id = await turtle.getId();
      const parsedId = +id?.toString();
      if (parsedId > 0) {
        const allResults = window.localStorage.getItem("statistics");
        let minusId = parsedId - 1;
        const addresses: { id: number; address: string }[] = [];
        const parsedStatistics = allResults && JSON.parse(allResults);
        for (let i = 0; i < 2; i++) {
          if (minusId > 0) {
            const isId =
              Array.isArray(parsedStatistics) &&
              parsedStatistics.find(el => +el.id === +minusId);
            if (!isId) {
              const address = await controlCenter?.getTournamentAddress(
                BigInt(minusId)
              );
              if (address)
                addresses.push({ address: address.toString(), id: minusId });
              minusId = minusId - 1;
            }
          }
        }
        const statistics = Array.isArray(parsedStatistics)
          ? parsedStatistics
          : [];
        if (addresses.length) {
          let time = 0;
          let count = 0;
          time = setInterval(async () => {
            try {
              if (count < 2 && addresses[count]?.address) {
                const data = await turtle.getData(
                  Address.parse(addresses[count].address as string)
                );
                if (data) {
                  const newData = {};
                  for (const field in data) {
                    if (typeof data[field] === "bigint")
                      newData[field] = data[field].toString();
                  }
                  statistics.push({ id: addresses[count].id, data: newData });
                }
              } else {
                window.localStorage.setItem(
                  "statistics",
                  JSON.stringify(statistics)
                );
                clearInterval(time);
              }
            } catch (error) {
              clearInterval(time);
              if (statistics.length) {
                window.localStorage.setItem(
                  "statistics",
                  JSON.stringify(statistics)
                );
              }
            }
            count += 1;
          }, 2000);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      createErrorStore({
        text: err.message,
        type: EnumHandlerError.ERROR
      });
    }
  };

  const requestGetResults = async () => {
    try {
      if (!client) return;
      const address = await requestActiveAddress();
      if (address) {
        const contract = Turtle.fromAddress(Address.parse(address as string));
        const turtle = client.open(contract) as OpenedContract<Turtle>;
        const data = await turtle.getData(Address.parse(address as string));
        if (data) requestIsData(turtle);
        return data;
      } else
        createErrorStore({
          text: "Отсутствует активный адрес",
          type: EnumHandlerError.ERROR
        });
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 504) {
        createErrorStore({
          text: "Слишком много запросов, повторите позже",
          type: EnumHandlerError.ERROR
        });
        return;
      }
      if (err.message.includes("Unable to execute get method")) {
        createErrorStore({
          text: "Будьте первыми сделайте ставку",
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
        text: "Неудалось поставить ставку",
        type: EnumHandlerError.ERROR
      });
    }
  };

  return {
    // takeBet: async (address: string, minValue: number) => {
    //   try {
    //     const contract = Turtle.fromAddress(Address.parse(address));
    //     const turtle = (await client.open(contract)) as OpenedContract<Turtle>;
    //     const id = await turtle.getId();
    //     const message = {
    //       $$type: "CPnl",
    //       id: id
    //     };
    //     const data = await controlCenter?.send(
    //       sender,
    //       { value: toNano("0.05") },
    //       message
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    requestMakeBet,
    requestGetResults,
    isControllerLoading: isLoaded,
    address,
    isRequest,
    setOptions
  };
};
