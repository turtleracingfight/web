import { useAccount } from "./useAccount.tsx";
import {
  CBet,
  ControlCenter
} from "../../build/ControlCenter/tact_ControlCenter.ts";
import { useAsyncInitialize } from "./useInitial.tsx";
import { Address, OpenedContract, toNano } from "@ton/core";
import { Turtle } from "../../build/Turtle/tact_Turtle.ts";
import { useEffect, useState } from "react";

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

  const getActiveAddress = async () => {
    const today = new Date().toLocaleDateString("ru-RU");
    let activeAddress: Address | string | null =
      window.localStorage.getItem("activeAddress") || "";
    if (activeAddress) {
      const parsedAddress = JSON.parse(activeAddress);
      if (parsedAddress.date !== today) {
        const contract = Turtle.fromAddress(
          Address.parse(parsedAddress.address)
        );
        const turtle = (await client.open(contract)) as OpenedContract<Turtle>;
        if (turtle) {
          const results = await turtle.getData(
            Address.parse(address as string)
          );
          if (results) {
            const objects = {};
            for (const bet in results) {
              if (typeof results[bet] === "bigint")
                objects[bet] = results[bet].toString();
            }
            const allBets = window.localStorage.getItem("allBets");
            if (allBets) {
              const parsedAllBets: any[] = JSON.parse(allBets);
              const foundElem = parsedAllBets.find(el => el.date === today);
              if (foundElem) return;
              parsedAllBets.push({
                address: parsedAddress.address,
                bets: objects,
                date: parsedAddress.date
              });
              window.localStorage.setItem(
                "allBets",
                JSON.stringify(parsedAllBets)
              );
            } else {
              const allBets = [
                {
                  address: parsedAddress.address,
                  bets: objects,
                  date: parsedAddress.date
                }
              ];
              window.localStorage.setItem("allBets", JSON.stringify(allBets));
            }
          }
        }
        window.localStorage.removeItem("activeAddress");
        activeAddress = "";
      }
    }
    if (!activeAddress.length) {
      const address = await controlCenter?.getTournamentActive();
      const strAddress = address ? address.toString() : "";
      const todayActiveAddress = {
        date: new Date().toLocaleDateString("ru-RU"),
        address: strAddress
      };
      activeAddress = JSON.stringify(todayActiveAddress);
      window.localStorage.setItem("activeAddress", activeAddress);
    }
    const currentAddress = JSON.parse(activeAddress) as {
      date: string;
      address: string;
    };
    return { ...currentAddress };
  };

  const getBetsToday = async () => {
    try {
      const currentAddress = await getActiveAddress();
      const contract = Turtle.fromAddress(
        Address.parse(currentAddress.address)
      );
      const turtle = (await client.open(contract)) as OpenedContract<Turtle>;
      if (turtle) {
        const data = await turtle.getData(Address.parse(address as string));
        if (data) return data;
      }
      return {};
    } catch (error) {}
  };

  const getInitBetsToday = async () => {
    try {
      if (!client || !address) return;
      setIsRequest(true);
      const currentAddress = await getActiveAddress();
      const contract = Turtle.fromAddress(
        Address.parse(currentAddress.address)
      );
      const turtle = (await client.open(contract)) as OpenedContract<Turtle>;
      if (turtle) {
        try {
          const data = await turtle.getData(Address.parse(address));
          const results: { [key: string]: string } = {};
          for (const bet in data) {
            if (typeof data[bet] === "bigint")
              results[bet] = data[bet].toString();
          }
          if (results) {
            setIsRequest(false);
            return results;
          }
        } catch (error) {
          if (
            error.message ===
            "Unable to execute get method. Got exit_code: -13 error"
          ) {
            console.log("Будьте первыми");
          }
        }
      } else setIsRequest(false);
    } catch (error) {
      setIsRequest(false);
    }
  };

  return {
    makeBet: (value: number, turtleId: number) => {
      controlCenter?.send(
        sender,
        {
          value: toNano(value)
        },
        messageBet(turtleId)
      );
    },
    takeBet: async (address: string, minValue: number) => {
      try {
        const contract = Turtle.fromAddress(Address.parse(address));
        const turtle = (await client.open(contract)) as OpenedContract<Turtle>;
        const id = await turtle.getId();
        const message = {
          $$type: "CPnl",
          id: id
        };
        const data = await controlCenter?.send(
          sender,
          { value: toNano("0.05") },
          message
        );
      } catch (error) {
        console.log(error);
      }
    },
    getInitBetsToday,
    getBetsToday,
    isControllerLoading: isLoaded,
    address,
    isRequest,
    setOptions
  };
};
