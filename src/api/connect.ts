import axios, { AxiosError } from "axios";

export const instance = axios.create({});

export const requestTon = {
  async getTonBalance(
    address: string,
    set: (balance: number) => void
  ): Promise<void> {
    try {
      const { data } = await instance.get(
        `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
      );
      if (data?.result) set(data.result / 10 ** 9);
      else alert("Отсутствует баланс по указанному адресу");
    } catch (error) {
      const err = error as AxiosError;
      alert(err.message);
    }
  }
};
