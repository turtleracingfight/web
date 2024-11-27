import { TonClient } from "@ton/ton";
import { CHAIN } from "@tonconnect/ui-react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAsyncInitialize } from "./useInitial.tsx";

export function useTonClient(network: CHAIN) {
  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;

      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
        })
      });
    }, [network])
  };
}
