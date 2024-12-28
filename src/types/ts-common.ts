export interface IAddressWallet {
  balance?: string;
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

export type TResultBets = {
  [key: string]: string | bigint;
};

export type THistory = {
  name: string;
  svg: string;
  bet: string;
  tour: string;
  won: string;
  id: number;
  isWinning: boolean;
  noBets?: boolean;
};

type TLang = {
  makeBet: string;
  listTurtles: string;
  allPeopleSet: string;
  selectLang: string;
  langRussian: string;
  langEnglish: string;
  balance: string;
  connectWallet: string;
  connect: string;
  connectForStart: string;
  confirm: string;
  activeAddress: string;
  lotRequest: string;
  beFirst: string;
  failPlaceBet: string;
  placedBet: string;
  cancelledTransaction: string;
  nextTour: string;
  notConnectedWallet: string;
  backMakeBet: string;
  profit: string;
  bet: string;
  tournament: string;
  congratulate: string;
  winningAmount: string;
  pickup: string;
  descriptionWinning: string;
  failBalance: string;
  takeWinning: string;
  endHistory: string;
  cancelledTakeWinning: string;
  prevAddress: string;
  noBets: string;
};

export type TLangs = {
  ru: TLang;
  en: TLang;
};

export type TInfoList = {
  id: number;
  ru: string;
  en: string;
  svg: string;
};

type TTurtle = {
  id: number;
  svg: string;
  en: string;
  ru: string;
};

export type TTurtleList = {
  [key: string]: TTurtle;
};

export type TRouteLinks = {
  listTurtles: "/list-turtles";
  home: "/home";
  history: "/history";
  preview: "/preview";
  connect: "/connect";
  settings: "/settings";
  makeBet: "/make-bet";
  another: "*";
  main: "/";
};
