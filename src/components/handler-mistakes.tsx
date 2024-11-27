import styles from "../styles/components/handler-mistakes.module.scss";
import error from "../../public/components/other/error.svg";
import success from "../../public/components/other/success.svg";
const arr = [1, 2, 3, 4, 5];

const helperMistakes = (value: string) => {
  switch (value) {
    case "error":
      return {
        color: "#ee384d",
        svg: error,
        text: "Ошибка"
      };
    case "success":
      return {
        color: "#2ea187",
        svg: success,
        text: "Успешно"
      };
  }
};

export const HandlerMistakes = () => {
  return (
    <div className={styles.container}>
      {arr.map(el => {
        const test = helperMistakes("success");
        return (
          <div key={el} className={styles.container_mistake}>
            <div className={styles.container_mistake_inf}>
              <div className={styles.container_mistake_inf_img}>
                <img src={test.svg} alt={"error"} />
                <h3 style={{ color: test.color }}>{test.text}</h3>
              </div>
              <p>Не удалось произвести транзакцию.</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
