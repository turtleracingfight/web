export interface IAddressWallet {
  balance: number;
  address: string;
}

export type TSwiper = {
  slidePrev: () => void;
  slideNext: () => void;
} | null;

export type THelperError = {
  img: string;
  color: string;
  name: string;
};
