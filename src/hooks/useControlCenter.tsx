import { useAccount } from "./useAccount.tsx";
import { ControlCenter } from "../../build/ControlCenter/tact_ControlCenter.ts";
import { useAsyncInitialize } from "./useInitial.tsx";
import { Address, OpenedContract } from "@ton/core";
import { useEffect, useState } from "react";
import { useStoreContact } from "../store/store-contract.ts";

let time = 0;
const CONTRACT = "kQA_rDaDFj2S3B43CH74saTmWx0HTCfP0LntZvUmsyksvGsr";
export const useControlCenter = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const { address, sender, client, setOptions } = useAccount();
  const setContractCenter = useStoreContact(state => state.setContractCenter);

  const controlCenter = useAsyncInitialize(async () => {
    if (!client || !address) return;
    const contract = ControlCenter.fromAddress(Address.parse(CONTRACT));
    return client.open(contract) as OpenedContract<ControlCenter>;
  }, [client, address]);

  const helperLoadedAcc = () => {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      setIsLoaded(false);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      if (address && controlCenter) {
        setIsLoaded(false);
        setContractCenter(controlCenter, sender, address, client);
      } else helperLoadedAcc();
    })();
  }, [controlCenter, address]);

  return {
    isControllerLoading: isLoaded,
    controlCenter,
    address,
    setOptions
  };
};
