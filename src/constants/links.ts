import zoom from "/components/turtles/zoom.svg";
import gladiator from "/components/turtles/gladiator.svg";
import formula from "/components/turtles/formula.svg";
import impulse from "/components/turtles/impulse.svg";
import corkscrew from "/components/turtles/corkscrew.svg";
import ninja from "/components/turtles/ninja.svg";
import nitro from "/components/turtles/nitro.svg";
import parapsi from "/components/turtles/parapsi.svg";
import track from "/components/turtles/track.svg";
import stronghold from "/components/turtles/stronghold.svg";
import turtles from "/components/other/turtles.svg";
import moon from "/components/other/moon.svg";
import money from "/components/other/money.svg";
import wallet from "/components/other/wallet.svg";
import percent from "/components/other/percent.svg";
import fg_russia from "/components/other/fg-rus.svg";
import fg_english from "/components/other/fg-english.svg";

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
    text: "В игре участвуют 10 черепах. Участники могут делать ставки на любое количество черепах и на любую из них",
    svg: turtles
  },
  {
    id: 2,
    text: "Победителем считается черепаха, на которую поставили меньше всего",
    svg: impulse
  },
  { id: 3, text: "Забег заканчивается в субботу вечером", svg: moon },
  {
    id: 4,
    text: "Сумма ставок делится между всеми игроками, которые поставили на победившую черепаху",
    svg: money
  },
  {
    id: 5,
    text: "Сумма выигрыша автоматически зачисляется на ваш кошелек",
    svg: wallet
  },
  {
    id: 6,
    text: "Наша комиссия составляет 10% от общей суммы ставок",
    svg: percent
  }
];

export const TURTLES = [
  { id: 0, svg: zoom, name: "ЗУМ" },
  { id: 1, svg: stronghold, name: "ТВЕРДЫНЯ" },
  { id: 2, svg: track, name: "ЭКШН-ТРЕК" },
  { id: 3, svg: gladiator, name: "ГЛАДИАТОР" },
  { id: 4, svg: corkscrew, name: "ШТОПОР" },
  { id: 5, svg: formula, name: "ФОРМУЛА-1" },
  { id: 6, svg: impulse, name: "ИМУЛЬС" },
  { id: 7, svg: nitro, name: "НИТРО" },
  { id: 8, svg: ninja, name: "НИНДЗЯ" },
  { id: 9, svg: parapsi, name: "ПАРА-ПСИ" }
];

export const LIST_LANGUAGES = [
  { id: 1, lang: "Русский", svg: fg_russia },
  { id: 2, lang: "English", svg: fg_english }
];
