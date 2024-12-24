import { TLangs } from "../types/ts-common.ts";
import { Locales } from "@tonconnect/ui";

export const LANGS: TLangs = {
  en: {
    makeBet: "Make bet",
    listTurtles: "List of turtles",
    allPeopleSet: "Set",
    selectLang: "Select a language",
    langRussian: "Russian",
    langEnglish: "English",
    balance: "Your balance",
    connectWallet: "Connect wallet",
    connect: "Connect",
    connectForStart:
      "To participate in the game, you need to connect your wallet and place a bet",
    confirm: "Confirm",
    activeAddress: "Couldn't get the active address of the tournament",
    lotRequest: "Too many requests, please repeat later",
    beFirst: "Be the first to place a bet",
    failPlaceBet: "Failed to place a bet",
    placedBet: "The bet is placed",
    cancelledTransaction: "The transaction was rejected",
    nextTour: "Error in getting time to the next tournament",
    notConnectedWallet: "The wallet is not connected",
    agoMakeBet: "Ago",
    winning: "Winning",
    bet: "Bet",
    tournament: "Tournament",
    congratulate: "Congratulate!",
    winningAmount: "Your winnings amounted to:",
    pickup: "Pick up",
    descriptionWinning:
      "*The amount will be automatically credited to your wallet",
    failBalance:
      "It was not possible to get the wallet balance at the specified address",
    takeWinning: "Congratulations! The winnings are taken away",
    endHistory: "The entire betting history has been received",
    cancelledTakeWinning: "Couldn't collect winnings",
    prevAddress: "Error when receiving the previous address"
  },
  ru: {
    makeBet: "Сделать ставку",
    listTurtles: "Список черепах",
    allPeopleSet: "Поставили",
    selectLang: "Выберите язык",
    langRussian: "Русский",
    langEnglish: "Английский",
    balance: "Ваш баланс",
    connectWallet: "Подключить кошелёк",
    connect: "Подключить",
    connectForStart:
      "Чтобы принять участие в игре, вам необходимо подключить свой кошелек и сделать ставку",
    confirm: "Подтвердить",
    activeAddress: "Не удалось получить активный адрес турнира",
    lotRequest: "Слишком много запросов, повторите позже",
    beFirst: "Будьте первыми, сделайте ставку",
    failPlaceBet: "Не удалось поставить ставку",
    placedBet: "Ставка поставлена",
    cancelledTransaction: "Транзакция была отклонена",
    nextTour: "Ошибка при получении времени следующего турнира",
    notConnectedWallet: "Кошелек не подключен",
    agoMakeBet: "Назад",
    winning: "Выигрыш",
    bet: "Ставка",
    tournament: "Турнир",
    congratulate: "Поздравляем!",
    winningAmount: "Ваш выигрыш составил:",
    pickup: "Забрать",
    descriptionWinning: "*Сумма будет автоматически зачислена на ваш кошелек",
    failBalance: "Не удалось получить баланс кошелька по указанному адресу",
    takeWinning: "Поздравляю! Выигрыш забран",
    endHistory: "Вся история ставок получена",
    cancelledTakeWinning: "Не удалось забрать выигрыш",
    prevAddress: "Ошибка при получении прошлого адреса"
  }
};

export const helperTranslate = (lang: Locales, minute: number) => {
  const text = {
    ru: `Обратите внимание на то что до конца турнира осталось меньше ${minute} минут, ставка может не дойти`,
    en: `Please note that there are less than ${minute}  minutes left until the end of the tournament, the bet may not reach`
  };
  return text[lang];
};
