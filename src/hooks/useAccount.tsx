import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, SenderArguments } from "@ton/core";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";
import { useTonClient } from "./useTonClient.tsx";
import { useLang } from "./useLang.tsx";
import { useEffect } from "react";

export const useAccount = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  const { lang } = useLang();
  let network = wallet?.account.chain;
  const navigate = useNavigate();
  const { client } = useTonClient(network as CHAIN);

  useEffect(() => {
    if (tonConnectUI && lang) setOptions({ language: lang });
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
            validUntil: Date.now() + 1 * 60 * 1000 // 1 minutes for user to approve
          });
          if (transaction.boc) navigate(ROUTES.listTurtles);
        } catch (error) {
          alert("Оплата не прошла!");
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
