import styles from "../styles/pages/statistics.module.scss";
import { CURRENCY, TURTLES } from "../constants/links.ts";

export const Statistics = () => {
  return (
    <div className={styles.container}>
      {TURTLES.map(el => (
        <div className={styles.container_bl}>
          <div className={styles.container_bl_stats}>
            <div className={styles.container_bl_stats_bet}>
              <div className={styles.container_bl_stats_bet_content}>
                <p>Ставка</p>
                <img src={el.svg} alt={el.name} />
              </div>
              <p>{(Math.random() * 100).toFixed(2)} {CURRENCY}</p>
            </div>
            <div className={styles.container_bl_stats_elipse}></div>
            <div className={styles.container_bl_stats_win}>
              <div className={styles.container_bl_stats_win_name}>
                <div className={styles.container_bl_stats_win_name_content}>
                  <p>2/09/2024</p>
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
