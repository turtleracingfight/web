import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, SenderArguments } from "@ton/core";
import { ROUTES } from "../constants/route.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useTonClient } from "./useTonClient.tsx";
import { useLang } from "./useLang.tsx";
import { useEffect } from "react";
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { LANGS } from "../constants/langs.ts";

export const useAccount = () => {
  const location = useLocation();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  const { lang } = useLang();
  let network = wallet?.account.chain;
  const navigate = useNavigate();
  const { client } = useTonClient(network as CHAIN);

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
        try {
          const transaction = await tonConnectUI.sendTransaction({
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString("base64")
              }
            ],
            validUntil: Date.now() + 60 * 1000 // 1 minutes for user to approve
          });
          if (transaction.boc) {
            createErrorStore({
              text: LANGS[lang].placedBet,
              type: EnumHandlerError.SUCCESS
            });
            navigate(
              location?.state === ROUTES.listTurtles
                ? ROUTES.listTurtles
                : ROUTES.home
            );
          }
        } catch (error) {
          createErrorStore({
            text: LANGS[lang].cancelledBet,
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
