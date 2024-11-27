import { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { requestTon } from "../api/connect.ts";

let time = 0;
export const useGetBalance = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  tonConnectUI.onStatusChange(state => {
    if (state === null) setBalance(0);
  });

  useEffect(() => {
    if (tonConnectUI?.account?.address && setLoading) setLoading(false);
  }, [tonConnectUI]);

  useEffect(() => {
    if (wallet?.account?.address && +balance === 0) {
      (async () => {
        if (wallet?.account?.address) {
          await requestTon.getTonBalance(
            wallet.account.address,
            setBalance,
            setLoading
          );
        }
      })();
    }
  }, [wallet?.account?.address]);

  useEffect(() => {
    if (time) clearTimeout(time);
    if (!loading) {
      time = setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  }, [loading]);

  return {
    balance,
    loading
  };
};
