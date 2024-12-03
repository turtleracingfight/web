import styles from "../styles/pages/statistics.module.scss";
import { CURRENCY, TURTLES } from "../constants/links.ts";
import { useEffect, useState } from "react";
import { countTotalTon } from "../utils/usefulFunc.ts";
import { useControlCenter } from "../hooks/useControlCenter.tsx";

const checkWinner = bets => {
  const minBet = [];
  let wonTurtle = "";
  for (const bet of TURTLES) {
    if (bets[`total${bet.id + 1}`]) {
      minBet.push(+bets[`total${bet.id + 1}`]);
    }
  }
  const minValue = Math.min(...minBet);
  for (const bet of TURTLES) {
    if (+bets[`total${bet.id + 1}`] === minValue) wonTurtle = `me${bet.id + 1}`;
  }
  let howMuch = 0;
  if (minValue) {
    for (const bet of TURTLES) {
      if (+bets[`me${bet.id + 1}`] && `me${bet.id + 1}` === wonTurtle) {
        const all = (+bets["total"] / 100) * 90;
        const percent = bets[`me${bet.id + 1}`] / minValue;
        howMuch = (all / 100) * percent;
      }
    }
  }
  return { wonTurtle, howMuch };
};

const helperReturnBet = (bet: any) => {
  const parsedBets = JSON.parse(bet);
  const betTurtles = [];
  for (const elem of parsedBets) {
    if (typeof elem?.bets === "object") {
      const { howMuch, wonTurtle } = checkWinner(elem.bets);
      for (const bet_turtle of TURTLES) {
        if (+elem?.bets[`me${bet_turtle.id + 1}`])
          betTurtles.push({
            ...bet_turtle,
            bet: countTotalTon(+elem?.bets[`me${bet_turtle.id + 1}`]),
            date: elem.date,
            won:
              `me${bet_turtle.id + 1}` === wonTurtle
                ? countTotalTon(howMuch)
                : 0,
            address: elem.address
          });
      }
    }
  }
  return betTurtles;
};

export const Statistics = () => {
  const [listTurtles, setListTurtles] = useState<any[]>([]);
  const turtles = window.localStorage.getItem("allBets");

  const { takeBet } = useControlCenter();

  useEffect(() => {
    if (turtles) {
      const listTurtles = helperReturnBet(turtles);
      setListTurtles(listTurtles);
    }
  }, [turtles]);
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
              <p
                style={{ border: el.won ? "solid 1px green" : "none" }}
                onClick={() => takeBet(el.address, el.won)}
              >
                {el.won} {CURRENCY}
              </p>
            </div>
          </div>
          <div className={styles.container_bl_border}></div>
        </div>
      ))}
    </div>
  );
};
