import zoom from "/components/turtles/zoom.png";
import gladiator from "/components/turtles/gladiator.png";
import formula from "/components/turtles/formula.png";
import impulse from "/components/turtles/impulse.png";
import corkscrew from "/components/turtles/corkscrew.png";
import ninja from "/components/turtles/ninja.png";
import nitro from "/components/turtles/nitro.png";
import parapsi from "/components/turtles/parapsi.png";
import track from "/components/turtles/track.png";
import stronghold from "/components/turtles/stronghold.png";
import turtles from "/components/other/turtles.png";
import moon from "/components/other/moon.png";
import money from "/components/other/money.png";
import wallet from "/components/other/wallet.png";
import percent from "/components/other/percent.png";
import fg_russia from "/components/other/fg-rus.svg";
import fg_english from "/components/other/fg-english.svg";
import { TListLanguages } from "../types/ts-links.ts";

export const CURRENCY = "TON";

export const LIST_TURTLES = [
  { id: 1, img: gladiator },
  { id: 2, img: track },
  { id: 3, img: ninja },
  { id: 4, img: impulse }
];

export const INFO_LIST = [
  {
    id: 1,
    ru: "В игре участвуют 10 черепах. Участники могут делать ставки на любое количество черепах и на любую из них",
    en: "There are 10 turtles in the game. Participants can place bets on any number of turtles and on any of them",
    svg: turtles
  },
  {
    id: 2,
    ru: "Победителем считается черепаха, на которую поставили меньше всего",
    en: "The winner is the turtle that has the least bet on",
    svg: impulse
  },
  {
    id: 3,
    ru: "Забег заканчивается в субботу вечером",
    en: "The race ends on Saturday evening",
    svg: moon
  },
  {
    id: 4,
    ru: "Сумма ставок делится между всеми игроками, которые поставили на победившую черепаху",
    en: "The amount of bets is divided among all the players who bet on the winning turtle",
    svg: money
  },
  {
    id: 5,
    ru: "Сумма выигрыша автоматически зачисляется на ваш кошелек",
    en: "The winning amount is automatically credited to your wallet",
    svg: wallet
  },
  {
    id: 6,
    ru: "Наша комиссия составляет 10% от общей суммы ставок",
    en: "Our commission is 10% of the total amount of bets",
    svg: percent
  }
];

export const TURTLES = [
  { id: 0, svg: zoom, ru: "ЗУМ", en: "Zoom" },
  { id: 1, svg: stronghold, ru: "ТВЕРДЫНЯ", en: "STRONGHOLD" },
  { id: 2, svg: track, ru: "ЭКШН-ТРЕК", en: "ACTION TRACK" },
  { id: 3, svg: gladiator, ru: "ГЛАДИАТОР", en: "GLADIATOR" },
  { id: 4, svg: corkscrew, ru: "ШТОПОР", en: "CORKSCREW" },
  { id: 5, svg: formula, ru: "ФОРМУЛА-1", en: "FORMULA-1" },
  { id: 6, svg: impulse, ru: "ИМУЛЬС", en: "IMPULSE" },
  { id: 7, svg: nitro, ru: "НИТРО", en: "NITRO" },
  { id: 8, svg: ninja, ru: "НИНДЗЯ", en: "NINJA" },
  { id: 9, svg: parapsi, ru: "ПАРА-ПСИ", en: "PARA-PSI" }
];

export const LIST_LANGUAGES: TListLanguages[] = [
  { id: 1, ru: "Русский", en: "Russian", svg: fg_russia, lang: "ru" },
  { id: 2, ru: "Английский", en: "English", svg: fg_english, lang: "en" }
];
