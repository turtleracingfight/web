import { ListTurtles } from "../pages/list-turtles.tsx";
import { Navigate } from "react-router-dom";
import { Statistics } from "../pages/statistics.tsx";
import { Preview } from "../pages/preview.tsx";
import { Settings } from "../pages/settings.tsx";
import ac_statistics from "/components/navigation/ac-statistics.svg";
import statistics from "/components/navigation/statistics.svg";
import ac_main from "/components/navigation/ac-home.svg";
import main from "/components/navigation/home.svg";
import ac_faq from "/components/navigation/ac-faq.svg";
import faq from "/components/navigation/faq.svg";
import { BetWon } from "../pages/bet-won.tsx";

export const ROUTES = {
  listTurtles: "/list-turtles",
  home: "/home",
  statistics: "/stats",
  preview: "/preview",
  connect: "/connect",
  settings: "/settings",
  makeBet: "/make-bet",
  another: "*",
  main: "/"
};

export const LIST_ROUTES = [
  { path: ROUTES.main, component: <Navigate to={ROUTES.home} /> },
  { path: ROUTES.listTurtles, component: <ListTurtles /> },
  { path: ROUTES.statistics, component: <Statistics /> },
  { path: ROUTES.preview, component: <Preview /> },
  { path: ROUTES.settings, component: <Settings /> },
  { path: "/make-bet/:id", component: <BetWon /> },
  { path: ROUTES.another, component: <Navigate to={ROUTES.home} /> }
];

export const NAVIGATION_LINKS = [
  {
    id: 1,
    visible: ac_statistics,
    hidden: statistics,
    path: ROUTES.statistics
  },
  { id: 2, visible: ac_main, hidden: main, path: ROUTES.home },
  { id: 3, visible: ac_faq, hidden: faq, path: ROUTES.preview }
];
