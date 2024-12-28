import styles from "../styles/pages/bet-won.module.scss";
import coins from "/pages/coins.png";
import { BtnCommon } from "../components/buttons.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { CURRENCY } from "../constants/links.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useLang } from "../hooks/useLang.tsx";
import {
  helperTranslate,
  helperTranslateCommission,
  LANGS
} from "../constants/langs.ts";
import { useStoreContact } from "../store/store-contract.ts";
import { ROUTES } from "../constants/route.tsx";
import { ExpiresContract } from "../components/expiresContract.tsx";
import {
  ATTENTION_BET_MINUTE,
  DEFAULT_PNL,
  LIGHT_GREY
} from "../constants/constants-fields.ts";
import { helperAroundPnl } from "../utils/usefulFunc.ts";
import { createErrorStore } from "../store/store-errors.ts";
import { getLang } from "../store/store-lang.ts";
import { EnumHandlerError } from "../types/ts-store-errors.ts";

let notification = false;
export const BetWon = () => {
  const { lang } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const requestMakeBet = useStoreContact(state => state.requestMakeBet);
  const requestGetNext = useStoreContact(state => state.requestGetNext);
  const requestTakeWinningBet = useStoreContact(
    state => state.requestTakeWinningBet
  );
  const idWinning = useStoreContact(state => state.id);
  const winning = useStoreContact(state => state.winning);
  const contractCenter = useStoreContact(state => state.contractCenter);

  const [value, setValue] = useState<string>("");
  const [attentionText, setAttentionText] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isWinning] = useState<boolean>(false);

  useEffect(() => {
    if (String(id).length && id !== undefined) {
      if (+id < 1 || +id > 10) navigate(ROUTES.home);
      if (id && isNaN(+id)) navigate(ROUTES.home);
    } else {
      if (!winning || !idWinning) navigate(ROUTES.home);
    }
  }, [navigate]);

  const handlerClickInput = () => {
    if (value.length) {
      const pnlValue = +value - DEFAULT_PNL;
      if (pnlValue > 0) setValue(helperAroundPnl(value));
    }
    setIsInput(true);
  };

  const handlerBlurInput = () => {
    if (value.length && +value !== 0) setValue(helperAroundPnl(value, "+"));
    else setValue("");
    setIsInput(false);
  };
  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handlerMakeBet = async () => {
    if (Boolean(!contractCenter && value.length)) {
      createErrorStore({
        text: LANGS[getLang()].notConnectedWallet,
        type: EnumHandlerError.ERROR
      });
      return;
    }
    if (!value.length) {
      const prev = window.sessionStorage.getItem("prev-page");
      navigate(prev === ROUTES.listTurtles ? ROUTES.listTurtles : ROUTES.home);
    }
    if (id && value.length) {
      const time = (await requestGetNext()) || 0;
      const minutes = Math.floor((time % 3600) / 60);
      if (minutes <= ATTENTION_BET_MINUTE && !notification) {
        setAttentionText(helperTranslate(lang, minutes));
        notification = true;
        return;
      }
      requestMakeBet(+value, +id);
      notification = false;
    }
  };

  const handlerAttentionText = () => setAttentionText("");
  const handlerTakeWinningBet = () => {
    if (winning && idWinning) requestTakeWinningBet();
  };

  return (
    <div
      className={styles.container}
      style={{
        background: `radial-gradient(23.75% ${isWinning ? "30vh" : "50vh"} at 50% 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`
      }}
    >
      {attentionText && (
        <ExpiresContract
          attentionText={attentionText}
          handlerAttentionText={handlerAttentionText}
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
        {id ? (
          <p style={{ margin: 0, color: LIGHT_GREY, fontSize: "10px" }}>
            {helperTranslateCommission(lang)}
          </p>
        ) : null}
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
              text={
                value.length ? LANGS[lang].confirm : LANGS[lang].backMakeBet
              }
              handlerClick={handlerMakeBet}
            />
          </div>
        )}
      </div>
      {!id ? (
        <p style={{ marginBottom: "15vh" }}>{LANGS[lang].descriptionWinning}</p>
      ) : null}
    </div>
  );
};
