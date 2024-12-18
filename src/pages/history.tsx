import styles from "../styles/pages/statistics.module.scss";
import { CURRENCY } from "../constants/links.ts";
import { useEffect, useState } from "react";
import { helperHistoryBet, serializeData } from "../utils/usefulFunc.ts";
import PullToRefresh from "react-pull-to-refresh";
import { useStoreContact } from "../store/store-contract.ts";
import { useStoreLang } from "../store/store-lang.ts";
import { LANGS } from "../constants/langs.ts";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";

let currentActiveId: number = 0;
export const History = () => {
  const navigate = useNavigate();
  const [listTurtles, setListTurtles] = useState<any[]>([]);
  const { activeId, requestGetData } = useStoreContact(state => state);
  const lang = useStoreLang(state => state.lang);
  const setWinningBet = useStoreContact(state => state.setWinningBet);

  const requestToHistory = async (id: number) => {
    if (id <= 0) {
      console.log("THE ACTIVE ID IS NULL");
      return;
    }
    const histories = window.localStorage.getItem("history");
    if (histories) {
      const parsedHistory = JSON.parse(histories) as { [key: string]: any };
      if (!parsedHistory[id]) {
        const data = await requestGetData(id);
        if (data) {
          parsedHistory[id] = serializeData(data);
          window.localStorage.setItem("history", JSON.stringify(parsedHistory));
        }
      } else {
        if (currentActiveId) {
          while (true) {
            if (currentActiveId === 0) {
              console.log("THE END HISTORY");
              break;
            }
            if (!parsedHistory[currentActiveId]) {
              const data = await requestGetData(id);
              if (data) parsedHistory[currentActiveId] = serializeData(data);
              window.localStorage.setItem(
                "history",
                JSON.stringify(parsedHistory)
              );
              break;
            }
            currentActiveId -= 1;
          }
        }
      }
    } else {
      const history = {};
      const data = await requestGetData(id);
      if (data) history[id] = serializeData(data);
      window.localStorage.setItem("history", JSON.stringify(history));
    }
    getHistory();
  };

  const getHistory = () => {
    const history = window.localStorage.getItem("history");
    if (history) {
      const parsedHistories = JSON.parse(history) as {
        [key: string]: any;
      };
      const allBets = [];
      for (const result in parsedHistories) {
        if (result) {
          const bets = helperHistoryBet(parsedHistories[result], result, lang);
          allBets.push(...bets);
        }
      }
      setListTurtles(allBets.sort((a, b) => b.id - a.id));
    }
  };

  useEffect(() => {
    if (activeId) {
      currentActiveId = activeId - 1;
      requestToHistory(currentActiveId);
    } else getHistory();
  }, [activeId]);

  const requestPullToRefresh = async (): Promise<void> =>
    requestToHistory(currentActiveId);

  const handlerTakeWinningBet = (
    id: number,
    value: string,
    isWinning: boolean
  ) => {
    if (!(+value > 0) || isWinning) return;
    setWinningBet(id, value);
    window.localStorage.setItem("bet-page", ROUTES.history);
    navigate(`${ROUTES.makeBet}/`);
  };

  return (
    <div className={styles.container}>
      <PullToRefresh
        className={styles.container_bl}
        onRefresh={requestPullToRefresh}
      >
        {listTurtles.map(el => (
          <div key={el.id + el.name}>
            <div className={styles.container_bl_stats}>
              <div className={styles.container_bl_stats_bet}>
                <div className={styles.container_bl_stats_bet_content}>
                  <p>{LANGS[lang].bet}</p>
                  <img src={el.svg} alt={el.name} />
                </div>
                <p>
                  {el.bet} {CURRENCY}
                </p>
              </div>
              <div className={styles.container_bl_stats_elipse}></div>
              <div className={styles.container_bl_stats_win}>
                <div className={styles.container_bl_stats_win_name}>
                  <div className={styles.container_bl_stats_win_name_content}>
                    <p>{el.tour}</p>
                    <p>{el.name}</p>
                  </div>
                  <p>{LANGS[lang].winning}</p>
                </div>
                <p
                  style={{
                    color: +el.won > 0 && !el.isWinning ? "#79d716" : "white"
                  }}
                  onClick={() =>
                    handlerTakeWinningBet(el.id, el.won, el.isWinning)
                  }
                >
                  {el.won} {CURRENCY}
                </p>
              </div>
            </div>
            <div className={styles.container_bl_border}></div>
          </div>
        ))}
      </PullToRefresh>
    </div>
  );
};
