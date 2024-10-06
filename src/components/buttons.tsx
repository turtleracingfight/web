import tg from "../assets/tg.svg";
import styles from '../styles/common.module.scss'
import arrowRight from "../assets/arrowright.svg";
import {TBtnCommon} from "../types/button-types.ts";
import {FC} from "react";

export const BtnConnectTg = () => <button className={styles.bt_connect_tg}>
    <img src={tg} alt="tg"/>
    <p>Подключить кошелёк</p>
</button>

export const BtnCommon: FC<TBtnCommon> = ({text, width, height, style, handlerClick, rtArrow}) => <button
    onClick={handlerClick}
    style={{
        width,
        height, ...style
    }}
    className={styles.bt_default}>
    <p>{text}</p>
    <img src={arrowRight} alt="arrow-right" style={{transform: rtArrow ? 'rotate(90deg)' : ''}}/>
</button>
