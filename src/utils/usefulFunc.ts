import { ROUTES } from "../constants/route.tsx";
import error from "../../public/components/other/error.png";
import success from "../../public/components/other/success.png";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { THelperError } from "../types/ts-common.ts";

export const helperNavigationStyles = (path: string) => {
  let currentPage = "";
  switch (path) {
    case ROUTES.home:
      currentPage = "50.14%";
      break;
    case ROUTES.statistics:
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
