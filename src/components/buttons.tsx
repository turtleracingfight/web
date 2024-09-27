import tg from "../assets/tg.svg";
import styles from '../styles/common.module.scss'
import arrowRight from "../assets/arrowright.svg";

export const BtnConnectTg = () => <button className={styles.bt_connect_tg}>
    <img src={tg} alt="tg"/>
    <p>Подключить кошелёк</p>
</button>

export const BtnCommon = ({text, width}: any) => <button style={{width}} className={styles.bt_replenish_wallet}>
    <p>{text}</p>
    <img src={arrowRight} alt="arrow-right"/>
</button>
