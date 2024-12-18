import styles from "../styles/pages/bet-won.module.scss";
import coins from "/pages/coins.png";
import { BtnCommon } from "../components/buttons.tsx";
import { ChangeEvent, useState } from "react";
import { CURRENCY } from "../constants/links.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useLang } from "../hooks/useLang.tsx";
import { LANGS } from "../constants/langs.ts";
import { useStoreContact } from "../store/store-contract.ts";
import { ROUTES } from "../constants/route.tsx";
import { ExpiresContract } from "../components/expiresContract.tsx";
import { Locales } from "@tonconnect/ui";

const helperTranslate = (lang: Locales, minute: number) => {
  const text = {
    ru: `Обратите внимание на то что до конца турнира осталось меньше ${minute} минут, ставка может не дойти`,
    en: `Please note that there are less than ${minute}  minutes left until the end of the tournament, the bet may not reach`
  };
  return text[lang];
};

let notification = false;
const DEFAULT_PNL = 0.05;
const LIGHT_GREY = "#707070";
export const BetWon = () => {
  const requestMakeBet = useStoreContact(state => state.requestMakeBet);
  const requestGetNext = useStoreContact(state => state.requestGetNext);
  const takeWinningBet = useStoreContact(state => state.takeWinningBet);
  const idWinning = useStoreContact(state => state.winning);
  const winning = useStoreContact(state => state.winning);
  const { lang } = useLang();

  const [value, setValue] = useState<string>("");
  const [isAttention, setIsAttention] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isWinning] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handlerClickInput = () => {
    if (value.length) {
      const pnlValue = +value - DEFAULT_PNL;
      if (pnlValue > 0)
        setValue((Math.round((+value - DEFAULT_PNL) * 100) / 100).toFixed(2));
    }
    setIsInput(true);
  };
  const handlerBlurInput = () => {
    if (value.length && +value !== 0)
      setValue((Math.round((+value + DEFAULT_PNL) * 100) / 100).toFixed(2));
    else setValue("");
    setIsInput(false);
  };
  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handlerMakeBet = async () => {
    if (!value.length) {
      const betPage = window.localStorage.getItem("bet-page");
      navigate(
        betPage === ROUTES.listTurtles ? ROUTES.listTurtles : ROUTES.home
      );
    }
    if (id && value.length) {
      const time = await requestGetNext();
      if (
        time &&
        (time?.minutes === 0 || time?.minutes <= 4) &&
        !notification
      ) {
        setIsAttention(
          helperTranslate(lang, time?.minutes === 0 ? 1 : time?.minutes)
        );
        notification = true;
        return;
      }
      requestMakeBet(+value, +id);
      notification = false;
    }
  };

  const handlerIsAttention = () => setIsAttention("");
  const handlerTakeWinningBet = () => {
    if (winning && idWinning) takeWinningBet();
  };

  return (
    <div
      className={styles.container}
      style={{
        background: `radial-gradient(23.75% ${isWinning ? "30vh" : "50vh"} at 50% 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
      }}
    >
      {isAttention && (
        <ExpiresContract
          isAttention={isAttention}
          handlerIsAttention={handlerIsAttention}
        />
      )}
      {!id && <img src={coins} alt="coins" />}
      <div className={styles.container_content}>
        <div className={styles.container_content_header}>
          {!id ? (
            <>
              <p>{LANGS[lang].congratulate}</p>
              <p>{LANGS[lang].winningAmount}</p>
            </>
          ) : (
            <p style={{ color: LIGHT_GREY }}>{LANGS[lang].makeBet}</p>
          )}
        </div>
        {!id ? (
          <div className={styles.container_content_winning}>
            <p>
              {winning} {CURRENCY}
            </p>
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
            <BtnCommon
              handlerClick={handlerTakeWinningBet}
              text={LANGS[lang].pickup}
            />
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
      {!id ? <p>{LANGS[lang].descriptionWinning}</p> : null}
    </div>
  );
};
