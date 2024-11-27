import axios, { AxiosError } from "axios";

export const instance = axios.create({});

export const requestTon = {
  async getTonBalance(
    address: string,
    set: (balance: number) => void,
    loading: (value: boolean) => void
  ): Promise<void> {
    try {
      const { data } = await instance.get(
        `https://testnet.toncenter.com/api/v2/getAddressBalance?address=${address}`
      );
      if (data?.result) {
        const ton = data.result / 10 ** 9;
        set(Math.floor(ton * 100) / 100);
        loading(false);
      } else {
        alert("Отсутствует баланс по указанному адресу");
        loading(false);
      }
    } catch (error) {
      loading(false);
      const err = error as AxiosError;
    }
  }
};
