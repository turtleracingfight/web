import { ROUTES } from "../constants/route.tsx";

export const helperNavigationStyles = (path: string) => {
  let currentPage = "";
  switch (path) {
    case ROUTES.home:
      currentPage = "50.14%";
      break;
    case ROUTES.statistics:
      currentPage = "20.14%";
      break;
    case ROUTES.info:
      currentPage = "80.14%";
      break;
  }
  return {
    content: `linear-gradient(90deg, #010101 0%, #3F4B25 ${currentPage}, #010101 100%)`,
    link: `radial-gradient(40.51% 100% at ${currentPage} 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
  };
};

export const helperUnnecessaryNavigation = (path: string) => {
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
  switch (path) {
    case ROUTES.makeBet:
      return true;
    default:
      return false;
  }
};

export const helperExcessMargin = (path: string) => {
  switch (path) {
    case ROUTES.listTurtles:
      return true;
    case ROUTES.makeBet:
      return true;
    default:
      return false;
  }
};
