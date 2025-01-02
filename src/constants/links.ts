import zoom from "/components/turtles/zoom.avif";
import gladiator from "/components/turtles/gladiator.avif";
import formula from "/components/turtles/formula.avif";
import impulse from "/components/turtles/impulse.avif";
import impulseInf from "/components/other/impulse.avif";
import corkscrew from "/components/turtles/corkscrew.avif";
import ninja from "/components/turtles/ninja.avif";
import nitro from "/components/turtles/nitro.avif";
import parapsi from "/components/turtles/parapsi.avif";
import track from "/components/turtles/track.avif";
import stronghold from "/components/turtles/stronghold.avif";
import turtles from "/components/other/turtles.avif";
import moon from "/components/other/moon.avif";
import money from "/components/other/money.avif";
import wallet from "/components/other/wallet.avif";
import percent from "/components/other/percent.avif";
import fg_russia from "/components/other/fg-rus.svg";
import fg_english from "/components/other/fg-english.svg";
import { TListLanguages } from "../types/ts-links.ts";
import { TInfoList, TTurtleList } from "../types/ts-common.ts";

export const CURRENCY = "TON";

export const LIST_TURTLES = [
  { id: 1, img: gladiator },
  { id: 2, img: track },
  { id: 3, img: ninja },
  { id: 4, img: impulse }
];

export const INFO_LIST: TInfoList[] = [
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
    svg: impulseInf
  },
  {
    id: 3,
    ru: "Забег заканчивается в конце дня",
    en: "The race will finish in the end of the day",
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

export const TURTLES_LINKS: TTurtleList = {
  me1: { id: 0, svg: zoom, ru: "ЗУМ", en: "Zoom" },
  me2: { id: 1, svg: stronghold, ru: "ТВЕРДЫНЯ", en: "STRONGHOLD" },
  me3: { id: 2, svg: track, ru: "ЭКШН-ТРЕК", en: "ACTION TRACK" },
  me4: { id: 3, svg: gladiator, ru: "ГЛАДИАТОР", en: "GLADIATOR" },
  me5: { id: 4, svg: corkscrew, ru: "ШТОПОР", en: "CORKSCREW" },
  me6: { id: 5, svg: formula, ru: "ФОРМУЛА-1", en: "FORMULA-1" },
  me7: { id: 6, svg: impulse, ru: "ИМУЛЬС", en: "IMPULSE" },
  me8: { id: 7, svg: nitro, ru: "НИТРО", en: "NITRO" },
  me9: { id: 8, svg: ninja, ru: "НИНДЗЯ", en: "NINJA" },
  me10: { id: 9, svg: parapsi, ru: "ПАРА-ПСИ", en: "PARA-PSI" }
};

export const LIST_LANGUAGES: TListLanguages[] = [
  { id: 1, ru: "Русский", en: "Russian", svg: fg_russia, lang: "ru" },
  { id: 2, ru: "Английский", en: "English", svg: fg_english, lang: "en" }
];
