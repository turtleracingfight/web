export interface IAddressWallet {
  address: string | undefined;
}

export type TSwiper = {
  slidePrev: () => void;
  slideNext: () => void;
} | null;
