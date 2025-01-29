import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnCommon } from "../components/buttons.tsx";
import { LANGS } from "../constants/langs.ts";
import { CURRENCY, TURTLES_LINKS } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { useLang } from "../hooks/useLang.tsx";
import { useStoreContact } from "../store/store-contract.ts";
import styles from "../styles/pages/list-turtles.module.scss";
import { countTotalTon } from "../utils/usefulFunc.ts";

export const ListTurtles = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [bet, setBet] = useState<{ [key: string]: bigint | string }>({});
  const requestGetData = useStoreContact(state => state.requestGetData);
  const [isZIndex, setIsZIndex] = useState(false);

  const handlerMakeBet = (id: number) => {
    window.sessionStorage.setItem("prev-page", ROUTES.listTurtles);
    navigate(`${ROUTES.makeBet}/${id + 1}`);
  };
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - (scrollHeight * 0.05);
    setIsZIndex(isBottom);
  }
  useEffect(() => {
    (async () => {
      const data = await requestGetData();
      if (data && Object.values(data).length) setBet(data);
    })();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container} style={{ zIndex: isZIndex ? 11 : 1, height: 'auto', backgroundColor: 'black' }}>
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
