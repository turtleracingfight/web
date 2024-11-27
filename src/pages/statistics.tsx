import styles from "../styles/pages/statistics.module.scss";
import { CURRENCY, TURTLES } from "../constants/links.ts";
import { useEffect, useState } from "react";
import { countTotalTon } from "../utils/usefulFunc.ts";

const helperReturnBet = (bet: any) => {
  const parsedBets = JSON.parse(bet);
  const betTurtles = [];
  for (const elem of parsedBets) {
    if (typeof elem?.bets === "object") {
      for (const bet_turtle of TURTLES) {
        if (+elem?.bets[`me${bet_turtle.id + 1}`])
          betTurtles.push({
            ...bet_turtle,
            bet: countTotalTon(+elem?.bets[`me${bet_turtle.id + 1}`]),
            date: elem.date
          });
      }
    }
  }
  return betTurtles;
};

export const Statistics = () => {
  const [listTurtles, setListTurtles] = useState<any[]>([]);
  const turtles = window.localStorage.getItem("allBets");

  useEffect(() => {
    if (turtles) {
      const listTurtles = helperReturnBet(turtles);
      setListTurtles(listTurtles);
    }
  }, [turtles]);
  console.log(listTurtles, "listTurtles");
  return (
    <div className={styles.container}>
      {listTurtles.map(el => (
        <div className={styles.container_bl} key={el.id + 1 + el.bet}>
          <div className={styles.container_bl_stats}>
            <div className={styles.container_bl_stats_bet}>
              <div className={styles.container_bl_stats_bet_content}>
                <p>Ставка</p>
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
                  <p>{el.date.split(".").join("/")}</p>
                  <p>{el.name}</p>
                </div>
                <p>Выигрыш</p>
              </div>
              <p>
                {(Math.random() * 100).toFixed(2)} {CURRENCY}
              </p>
            </div>
          </div>
          <div className={styles.container_bl_border}></div>
        </div>
      ))}
    </div>
  );
};
