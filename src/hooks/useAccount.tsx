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
import { useStoreContact } from "../store/store-contract.ts";
import { ETakeWinning } from "../types/ts-store-contract.ts";

export const useAccount = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  const navigate = useNavigate();
  const { lang } = useLang();
  const setWinningBet = useStoreContact(state => state.setWinningBet);
  let network = wallet?.account.chain;
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
            validUntil: Date.now() + 60 * 1000 // 1 minutes for user to approve
          });
          if (transaction.boc) {
            createErrorStore({
              text:
                prevPage === ROUTES.history
                  ? LANGS[lang].takeWinning
                  : LANGS[lang].placedBet,
              type: EnumHandlerError.SUCCESS
            });
            if (prevPage === ROUTES.history)
              setWinningBet(null, "0", ETakeWinning.takeWinning);
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
