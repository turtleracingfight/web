import { Address, OpenedContract, SenderArguments } from "@ton/core";
import { ControlCenter } from "../../build/ControlCenter/tact_ControlCenter.ts";

export type TSender = {
  send: (args: SenderArguments) => Promise<void>;
  address: Address | undefined;
};

export interface IStoreContract {
  activeId: number | null;
  id: number | null;
  winning: string;
  sender: null | TSender;
  contractCenter: null | OpenedContract<ControlCenter>;
  setContractCenter: (
    contractCenter: OpenedContract<ControlCenter>,
    sender: TSender
  ) => void;
  getActiveId: () => Promise<number | null | undefined>;
  requestGetNext: () => Promise<
    | {
        hours: number;
        minutes: number;
        seconds: number;
      }
    | null
    | undefined
  >;
  requestGetData: (
    id?: number
  ) => Promise<{ [key: string]: BigInt } | null | undefined>;
  requestMakeBet: (value: number, turtleId: number) => void;
  takeWinningBet: () => void;
  setWinningBet: (id: number | null, winning: string, type?: string) => void;
}
