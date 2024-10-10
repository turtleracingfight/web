import styles from "../styles/pages/bet-won.module.scss";
import coins from "/pages/coins.svg";
import { BtnCommon } from "../components/buttons.tsx";
import { ChangeEvent, useState } from "react";
import { CURRENCY } from "../constants/links.ts";

const LIGHT_GREY = "rgba(112, 112, 112, 1)";

export const BetWon = () => {
  const [value, setValue] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isWinning, setIsWinning] = useState<boolean>(true);

  const handlerClickInput = () => setIsInput(true);
  const handlerBlurInput = () => setIsInput(false);
  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div
      className={styles.container}
      style={{
        background: `radial-gradient(23.75% ${isWinning ? "30vh" : "50vh"} at 50% 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
      }}
    >
      {isWinning && <img src={coins} alt="coins" />}
      <div className={styles.container_content}>
        <div className={styles.container_content_header}>
          {isWinning ? (
            <>
              <p>Поздравляем!</p>
              <p>Ваш выигрыш составил:</p>
            </>
          ) : (
            <p style={{ color: LIGHT_GREY }}>Сделайте ставку</p>
          )}
        </div>
        {isWinning ? (
          <div className={styles.container_content_winning}>
            <p>2.14 {CURRENCY}</p>
          </div>
        ) : (
          <div
            style={{ justifyContent: isInput ? "flex-start" : "center" }}
            className={styles.container_content_winning}
            onClick={handlerClickInput}
            onBlur={handlerBlurInput}
          >
            {isInput && (
              <input
                autoFocus={true}
                type={"number"}
                value={value}
                onChange={handlerChangeValue}
              />
            )}
            <p
              style={{ color: value.length || isInput ? "white" : LIGHT_GREY }}
            >
              {isInput
                ? CURRENCY
                : value.length
                  ? value + ` ${CURRENCY}`
                  : `0 ${CURRENCY}`}{" "}
            </p>
          </div>
        )}
        {isWinning ? (
          <div className={styles.container_content_button}>
            <div className={styles.container_content_button_elipse}></div>
            <BtnCommon text={"Забрать"} />
          </div>
        ) : (
          <div className={styles.container_content_button}>
            {value && (
              <div className={styles.container_content_button_elipse}></div>
            )}
            <BtnCommon text={"Подтвердить"} />
          </div>
        )}
      </div>
      {isWinning ? (
        <p>*Сумма будет автоматически зачислена на ваш кошелек</p>
      ) : null}
    </div>
  );
};
