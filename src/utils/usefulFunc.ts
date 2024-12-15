import { ROUTES } from "../constants/route.tsx";
import error from "../../public/components/other/error.png";
import success from "../../public/components/other/success.png";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { THelperError } from "../types/ts-common.ts";
import { TURTLES_HISTORY } from "../constants/links.ts";
import { Locales } from "@tonconnect/ui";

export const helperNavigationStyles = (path: string) => {
  let currentPage = "";
  switch (path) {
    case ROUTES.home:
      currentPage = "50.14%";
      break;
    case ROUTES.history:
      currentPage = "20.14%";
      break;
    case ROUTES.preview:
      currentPage = "80.14%";
      break;
  }
  return {
    content: `linear-gradient(90deg, #010101 0%, #3F4B25 ${currentPage}, #010101 100%)`,
    link: `radial-gradient(40.51% 100% at ${currentPage} 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
  };
};

export const helperUnnecessaryNavigation = (path: string) => {
  if (path.includes(ROUTES.makeBet)) return true;
  switch (path) {
    case ROUTES.listTurtles:
      return true;
    case ROUTES.connect:
      return true;
    case ROUTES.settings:
      return true;
    case ROUTES.makeBet:
      return true;
    default:
      return false;
  }
};

export const helperUnnecessaryHeader = (path: string) => {
  return path.includes(ROUTES.makeBet);
};

export const helperExcessMarginNavigation = (path: string) => {
  switch (path) {
    case ROUTES.preview:
      return true;
  }
};

export const helperExcessMargin = (path: string) => {
  if (path.includes(ROUTES.makeBet)) return true;
  switch (path) {
    case ROUTES.listTurtles:
      return true;
    case ROUTES.preview:
      return true;
    case ROUTES.history:
      return true;
    default:
      return false;
  }
};

export const countTotalTon = (value: bigint | string) => {
  if (!value) return 0;
  const bet = typeof value === "bigint" ? value.toString() : String(value);
  return Math.floor((+bet / 10 ** 9) * 100) / 100;
};

export const helperErrorType = (type: EnumHandlerError): THelperError => {
  switch (type) {
    case EnumHandlerError.ERROR:
      return {
        img: error,
        name: EnumHandlerError.ERROR,
        color: "#e12311"
      };
    case EnumHandlerError.SUCCESS:
      return {
        img: success,
        name: EnumHandlerError.SUCCESS,
        color: "#32e732"
      };
    default:
      return {
        img: error,
        name: EnumHandlerError.ERROR,
        color: "red"
      };
  }
};

export const serializeData = (data: { [key: string]: BigInt }) => {
  const newData = {};
  if (data) {
    const valuesData = Object.keys(data);
    for (const field of valuesData) {
      if (typeof data[field] === "bigint")
        newData[field] = data[field].toString();
      else newData[field] = data[field];
    }
  }
  return newData;
};

export const helperHistoryBet = (
  data: { [key: string]: string },
  idTour: string,
  lang: Locales
) => {
  const bets = [];
  for (let i = 0; i < 10; i++) {
    const id = i + 1;
    if (data[`me${id}`].length && +data[`me${id}`] > 0)
      bets.push({
        name: TURTLES_HISTORY[`me${id}`][lang],
        svg: TURTLES_HISTORY[`me${id}`].svg,
        bet: countTotalTon(data[`me${id}`]),
        tour: idTour
      });
  }
  return bets;
};
