import styles from "../styles/pages/list-turtles.module.scss";
import { BtnCommon } from "../components/buttons.tsx";
import { CURRENCY, TURTLES } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";
import { useControlCenter } from "../hooks/useControlCenter.tsx";
import { useEffect, useState } from "react";

export const ListTurtles = () => {
  const navigate = useNavigate();
  const [myBet, setMyBet] = useState({});
  const handlerMakeBet = (id: number) =>
    navigate(`${ROUTES.makeBet}/${id + 1}`);

  const { getBetsToday, isControllerLoading } = useControlCenter();

  useEffect(() => {
    (async () => {
      const result = await getBetsToday();
      if (result) setMyBet(result);
    })();
  }, [isControllerLoading]);

  return (
    <div className={styles.container}>
      {TURTLES.map(el => {
        let betTon = 0;
        if (myBet[`total${el.id + 1}`])
          betTon =
            Math.floor(
              (Number(BigInt(myBet[`total${el.id + 1}`])) / 10 ** 9) * 100
            ) / 100;
        return (
          <div key={el.id} className={styles.container_bl}>
            <div className={styles.container_bl_turtle}>
              <div className={styles.container_bl_turtle_content}>
                <div
                  className={styles.container_bl_turtle_content_elipse}
                ></div>
                <img src={el.svg} alt={el.name} />
                <p>{el.name}</p>
              </div>
              <div className={styles.container_bl_turtle_bet}>
                <p>
                  {betTon} {CURRENCY}
                </p>
                <BtnCommon
                  handlerClick={() => handlerMakeBet(el.id)}
                  text={"Сделать ставку"}
                />
              </div>
            </div>
            <div className={styles.container_bl_border}></div>
          </div>
        );
      })}
    </div>
  );
};
