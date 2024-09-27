import styles from '../styles/winning.module.scss'
import tokens from '../assets/token.svg'
import {BtnCommon} from "../components/buttons.tsx";

export const Winning = () => {
    return <div className={styles.container}>
        <img src={tokens} alt="tokens"/>
        <div className={styles.container_content}>
            <div className={styles.container_content_header}>
                <p>Поздравляем!</p>
                <p>Ваш выигрыш составил:</p>
            </div>
            <div className={styles.container_content_winning}>
                <p>2.14 TON</p>
            </div>
            <div className={styles.container_content_button}>
                <div className={styles.container_content_button_elipse}></div>
                <BtnCommon text={'Забрать'} width={'35%'}/>
            </div>
        </div>
        <p>*Сумма будет автоматически зачислена на ваш кошелек</p>
    </div>
}
