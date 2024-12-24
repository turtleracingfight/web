import styles from "../styles/pages/list-turtles.module.scss";
import { BtnCommon } from "../components/buttons.tsx";
import { CURRENCY, TURTLES_LINKS } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LANGS } from "../constants/langs.ts";
import { useLang } from "../hooks/useLang.tsx";
import { useStoreContact } from "../store/store-contract.ts";
import { countTotalTon } from "../utils/usefulFunc.ts";

export const ListTurtles = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [bet, setBet] = useState<{ [key: string]: bigint | string }>({});
  const requestGetData = useStoreContact(state => state.requestGetData);

  const handlerMakeBet = (id: number) => {
    window.sessionStorage.setItem("prev-page", ROUTES.listTurtles);
    navigate(`${ROUTES.makeBet}/${id + 1}`);
  };

  useEffect(() => {
    (async () => {
      const data = await requestGetData();
      if (data && Object.values(data).length) setBet(data);
    })();
  }, []);

  return (
    <div className={styles.container}>
      {Object.values(TURTLES_LINKS).map(el => {
        let betTon = countTotalTon(bet[`me${el.id + 1}`]) || 0;
        return (
          <div key={el.id} className={styles.container_bl}>
            <div className={styles.container_bl_turtle}>
              <div className={styles.container_bl_turtle_content}>
                <div
                  className={styles.container_bl_turtle_content_elipse}
                ></div>
                <img src={el.svg} alt={el[lang]} />
                <p>{el[lang]}</p>
              </div>
              <div className={styles.container_bl_turtle_bet}>
                <p>
                  {betTon} {CURRENCY}
                </p>
                <BtnCommon
                  handlerClick={() => handlerMakeBet(el.id)}
                  text={LANGS[lang].makeBet}
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
