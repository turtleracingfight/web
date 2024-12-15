import styles from "../styles/pages/bet-won.module.scss";
import coins from "/pages/coins.png";
import { BtnCommon } from "../components/buttons.tsx";
import { ChangeEvent, useState } from "react";
import { CURRENCY } from "../constants/links.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLang } from "../hooks/useLang.tsx";
import { LANGS } from "../constants/langs.ts";
import { useStoreContact } from "../store/store-contract.ts";
import { ROUTES } from "../constants/route.tsx";

const DEFAULT_PNL = 0.05;
const LIGHT_GREY = "#707070";
export const BetWon = () => {
  const requestMakeBet = useStoreContact(state => state.requestMakeBet);
  const { lang } = useLang();

  const [value, setValue] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isWinning] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handlerClickInput = () => {
    if (value.length) {
      const pnlValue = +value - DEFAULT_PNL;
      if (pnlValue > 0) setValue(String(+value - DEFAULT_PNL));
    }
    setIsInput(true);
  };
  const handlerBlurInput = () => {
    if (value.length && +value !== 0) setValue(String(+value + DEFAULT_PNL));
    else setValue("");
    setIsInput(false);
  };
  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handlerMakeBet = () => {
    if (!value.length)
      navigate(
        location?.state === ROUTES.listTurtles
          ? ROUTES.listTurtles
          : ROUTES.home
      );
    if (id && value.length) requestMakeBet(+value, +id);
  };

  return (
    <div
      className={styles.container}
      style={{
        background: `radial-gradient(23.75% ${isWinning ? "30vh" : "50vh"} at 50% 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
      }}
    >
      {!id && <img src={coins} alt="coins" />}
      <div className={styles.container_content}>
        <div className={styles.container_content_header}>
          {!id ? (
            <>
              <p>Поздравляем!</p>
              <p>Ваш выигрыш составил:</p>
            </>
          ) : (
            <p style={{ color: LIGHT_GREY }}>{LANGS[lang].makeBet}</p>
          )}
        </div>
        {!id ? (
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
        {!id ? (
          <div className={styles.container_content_button}>
            <div className={styles.container_content_button_elipse}></div>
            <BtnCommon text={"Забрать"} />
          </div>
        ) : (
          <div className={styles.container_content_button}>
            {value ? (
              <div className={styles.container_content_button_elipse}></div>
            ) : null}
            <BtnCommon
              text={value.length ? LANGS[lang].confirm : LANGS[lang].agoMakeBet}
              handlerClick={handlerMakeBet}
            />
          </div>
        )}
      </div>
      {!id ? <p>*Сумма будет автоматически зачислена на ваш кошелек</p> : null}
    </div>
  );
};
