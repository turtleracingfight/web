import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, SenderArguments } from "@ton/core";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";
import { useTonClient } from "./useTonClient.tsx";
import { useLang } from "./useLang.tsx";
import { useEffect } from "react";
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { LANGS } from "../constants/langs.ts";
import { requestSetBalance, useStoreContact } from "../store/store-contract.ts";
import { EBalanceType, ETakeWinning } from "../types/ts-store-contract.ts";
import { requestTon } from "../api/connect.ts";
import {
  setIsLoadingBalance,
  useStoreLoadings
} from "../store/store-loadings.ts";
import { countTotalTon } from "../utils/usefulFunc.ts";

let time = 0;
export const useAccount = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  const navigate = useNavigate();
  const { lang } = useLang();
  const setWinningBet = useStoreContact(state => state.setWinningBet);
  const isLoadingBalance = useStoreLoadings(state => state.isLoadingBalance);
  let network = wallet?.account.chain;
  const { client } = useTonClient(network as CHAIN);

  tonConnectUI.onStatusChange(state => {
    if (state === null) requestSetBalance("0");
  });

  useEffect(() => {
    if (tonConnectUI?.account?.address) setIsLoadingBalance(false);
  }, [tonConnectUI]);

  useEffect(() => {
    if (wallet?.account?.address) {
      (async () => {
        if (wallet?.account?.address) {
          await requestTon.getTonBalance(wallet.account.address);
        }
      })();
    }
  }, [wallet?.account?.address]);

  useEffect(() => {
    if (time) clearTimeout(time);
    if (isLoadingBalance) {
      time = setTimeout(() => {
        setIsLoadingBalance(false);
      }, 1500);
    }
  }, [isLoadingBalance]);

  useEffect(() => {
    if (tonConnectUI && lang)
      setOptions({
        enableAndroidBackHandler: true,
        language: lang,
        actionsConfiguration: { notifications: ["before"] }
      });
  }, []);

  return {
    sender: {
      send: async (args: SenderArguments) => {
        const prevPage = window.sessionStorage.getItem("prev-page");
        try {
          const transaction = await tonConnectUI.sendTransaction({
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString("base64")
              }
            ],
            validUntil: Date.now() + 60 * 1000
          });
          if (transaction.boc) {
            createErrorStore({
              text:
                prevPage === ROUTES.history
                  ? LANGS[lang].takeWinning
                  : LANGS[lang].placedBet,
              type: EnumHandlerError.SUCCESS
            });
            if (prevPage === ROUTES.history) {
              requestSetBalance("", EBalanceType.plus);
              setWinningBet(null, "0", ETakeWinning.takeWinning);
            } else
              requestSetBalance(
                countTotalTon(args.value.toString()),
                EBalanceType.minus
              );
            window.sessionStorage.removeItem("prev-page");
            navigate(
              prevPage
                ? prevPage === ROUTES.history
                  ? ROUTES.history
                  : prevPage === ROUTES.listTurtles
                    ? ROUTES.listTurtles
                    : ROUTES.home
                : ROUTES.home
            );
          } else {
            window.sessionStorage.removeItem("prev-page");
            navigate(ROUTES.home);
          }
        } catch (error) {
          window.sessionStorage.removeItem("prev-page");
          navigate(ROUTES.home);
          createErrorStore({
            text:
              prevPage === ROUTES.history
                ? LANGS[lang].cancelledTakeWinning
                : LANGS[lang].failPlaceBet,
            type: EnumHandlerError.ERROR
          });
        }
      },
      address: wallet?.account?.address
        ? Address.parse(wallet?.account?.address as string)
        : undefined
    },
    client,
    address: wallet?.account.address ?? null,
    network: network ?? null,
    setOptions
  };
};
