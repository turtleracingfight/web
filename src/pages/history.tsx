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
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { THistory, TResultBets } from "../types/ts-common.ts";
import push from "../../public/components/other/push.png";

let currentActiveId: number = 0;
export const History = () => {
  const navigate = useNavigate();
  const [bets, setBets] = useState<THistory[]>([]);
  const lang = useStoreLang(state => state.lang);
  const setWinningBet = useStoreContact(state => state.setWinningBet);
  const activeId = useStoreContact(state => state.activeId);
  const getActiveId = useStoreContact(state => state.getActiveId);
  const requestGetHistoryData = useStoreContact(
    state => state.requestGetHistoryData
  );

  const requestToHistory = async (id: number) => {
    if (id <= 0) {
      createErrorStore({
        text: LANGS[lang].endHistory,
        type: EnumHandlerError.SUCCESS
      });
      return;
    }
    const histories = window.localStorage.getItem("history");
    if (histories) {
      const parsedHistory = JSON.parse(histories) as {
        [key: string]: TResultBets;
      };
      if (!parsedHistory[id]) {
        const data = await requestGetHistoryData(id);
        if (data) {
          parsedHistory[id] = serializeData(data);
          window.localStorage.setItem("history", JSON.stringify(parsedHistory));
        }
      } else {
        if (currentActiveId) {
          while (true) {
            if (currentActiveId === 0) {
              createErrorStore({
                text: LANGS[lang].endHistory,
                type: EnumHandlerError.SUCCESS
              });
              break;
            }
            if (!parsedHistory[currentActiveId]) {
              const data = await requestGetHistoryData(currentActiveId);
              if (data) {
                parsedHistory[currentActiveId] = serializeData(data);
                window.localStorage.setItem(
                  "history",
                  JSON.stringify(parsedHistory)
                );
              }
              break;
            }
            currentActiveId -= 1;
          }
        }
      }
    } else {
      const history: { [key: string]: TResultBets } = {};
      const data = await requestGetHistoryData(id);
      if (data) {
        history[id] = serializeData(data);
        window.localStorage.setItem("history", JSON.stringify(history));
      }
    }
    getHistory();
  };

  const getHistory = () => {
    const history = window.localStorage.getItem("history");
    if (history) {
      const parsedHistories = JSON.parse(history) as {
        [key: string]: TResultBets;
      };
      const allBets: THistory[] = [];
      for (const result in parsedHistories) {
        if (result) {
          const bets = helperHistoryBet(parsedHistories[result], result, lang);
          allBets.push(...bets);
        }
      }
      setBets(allBets.sort((a, b) => b.id - a.id));
    }
  };

  useEffect(() => {
    if (activeId) {
      currentActiveId = activeId - 1;
      requestToHistory(currentActiveId);
    } else {
      getActiveId();
      getHistory();
    }
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
    window.sessionStorage.setItem("prev-page", ROUTES.history);
    navigate(`${ROUTES.makeBet}/`);
  };

  return (
    <div className={styles.container}>
      <PullToRefresh
        className={styles.container_bl}
        onRefresh={requestPullToRefresh}
      >
        {bets.length ? (
          bets.map(el => (
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
          ))
        ) : (
          <p style={{ width: "100%", height: "80vh", textAlign: "center" }}>
            <img width={50} height={50} src={push} alt="push" />
          </p>
        )}
      </PullToRefresh>
    </div>
  );
};
