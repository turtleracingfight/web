import { Address, OpenedContract, SenderArguments } from "@ton/core";
import { ControlCenter } from "../../build/ControlCenter/tact_ControlCenter.ts";
import { TResultBets } from "./ts-common.ts";
import { TonClient } from "@ton/ton";

export type TSender = {
  send: (args: SenderArguments) => Promise<void>;
  address: Address | undefined;
};

export interface IStoreContract {
  activeId: number | null;
  id: number | null;
  winning: string;
  sender: null | TSender;
  userAddress: string;
  client: TonClient | undefined;
  contractCenter: null | OpenedContract<ControlCenter>;
  setContractCenter: (
    contractCenter: OpenedContract<ControlCenter>,
    sender: TSender,
    address: string,
    client: TonClient | undefined
  ) => void;
  getActiveId: () => Promise<number | undefined>;
  getActiveTour: () => Promise<Address | undefined>;
  requestGetNext: () => Promise<number | undefined>;
  requestGetData: () => Promise<TResultBets | undefined>;
  requestMakeBet: (value: number, turtleId: number) => void;
  requestTakeWinningBet: () => void;
  setWinningBet: (id: number | null, winning: string, type?: string) => void;
  requestGetHistoryData: (id: number) => Promise<TResultBets | undefined>;
}

export enum ETakeWinning {
  takeWinning = "TAKE_WINNING"
}
