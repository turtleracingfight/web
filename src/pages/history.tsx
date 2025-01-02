import styles from "../styles/pages/statistics.module.scss";
import { CURRENCY } from "../constants/links.ts";
import { useEffect, useState } from "react";
import { helperHistoryBet } from "../utils/usefulFunc.ts";
import PullToRefresh from "react-pull-to-refresh";
import { useStoreContact } from "../store/store-contract.ts";
import { useStoreLang } from "../store/store-lang.ts";
import { LANGS } from "../constants/langs.ts";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";
import { createErrorStore } from "../store/store-errors.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";
import { THistory } from "../types/ts-common.ts";
import push from "../../public/components/other/push.avif";

let currentActiveId: number = 0;
let countHistory = 5;
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

  const getHistory = async () => {
    const histories: { [key: number]: any } = {};
    for (let i = 0; i < countHistory; i++) {
      currentActiveId = currentActiveId - 1;
      if (currentActiveId <= 0) {
        createErrorStore({
          text: LANGS[lang].endHistory,
          type: EnumHandlerError.SUCCESS
        });
        break;
      }
      const data = window.localStorage.getItem("data" + currentActiveId);
      if (!data) {
        const result = await requestGetHistoryData(currentActiveId);
        if (!result) break;
        histories[currentActiveId] = result;
      } else histories[currentActiveId] = JSON.parse(data);
    }
    let allBets = [];
    for (const result in histories) {
      if (result) {
        const bets = helperHistoryBet(histories[result], result, lang);
        allBets.push(...bets);
      }
    }
    allBets = allBets.sort((a, b) => b.id - a.id);
    setBets(state => {
      return [...state, ...allBets];
    });
  };

  useEffect(() => {
    if (activeId) {
      currentActiveId = activeId;
      getHistory();
    } else getActiveId();
  }, [activeId]);

  const requestPullToRefresh = async (): Promise<void> => getHistory();

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
                    {el.noBets ? null : <img src={el.svg} alt={el.name} />}
                  </div>
                  <p>
                    {el.noBets ? 0 : el.bet} {CURRENCY}
                  </p>
                </div>
                <div className={styles.container_bl_stats_elipse}></div>
                <div className={styles.container_bl_stats_win}>
                  <div className={styles.container_bl_stats_win_name}>
                    <div className={styles.container_bl_stats_win_name_content}>
                      <p>{el.tour}</p>
                      <p>{el.name}</p>
                    </div>
                    <p>{LANGS[lang].profit}</p>
                  </div>
                  <p
                    style={{
                      color: +el.won > 0 && !el.isWinning ? "#79d716" : "white"
                    }}
                    onClick={() =>
                      handlerTakeWinningBet(el.id, el.won, el.isWinning)
                    }
                  >
                    {el.noBets ? 0 : el.won} {CURRENCY}
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
