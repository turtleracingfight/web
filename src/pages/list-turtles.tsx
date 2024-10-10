import styles from "../styles/pages/list-turtles.module.scss";
import { BtnCommon } from "../components/buttons.tsx";
import { CURRENCY, TURTLES } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";

export const ListTurtles = () => {
  const navigate = useNavigate();
  const handlerMakeBet = () => navigate(ROUTES.makeBet);
  return (
    <div className={styles.container}>
      {TURTLES.map(el => (
        <div className={styles.container_bl}>
          <div className={styles.container_bl_turtle}>
            <div className={styles.container_bl_turtle_content}>
              <div className={styles.container_bl_turtle_content_elipse}></div>
              <img height={"13vh"} src={el.svg} alt={el.name} />
              <p>{el.name}</p>
            </div>
            <div className={styles.container_bl_turtle_bet}>
              <p>
                {(Math.random() * 100).toFixed(2)} {CURRENCY}
              </p>
              <BtnCommon
                handlerClick={handlerMakeBet}
                text={"Сделать ставку"}
                width={"172px"}
              />
            </div>
          </div>
          <div className={styles.container_bl_border}></div>
        </div>
      ))}
    </div>
  );
};
