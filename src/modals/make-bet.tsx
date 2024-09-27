import {BtnCommon} from "../components/buttons.tsx";
import styles from '../styles/make-bet.module.scss'
import {useState} from "react";

export const MakeBet = () => {
    const [value, setValue] = useState(null)
    const handlerChangeValue = (e) => {
        setValue(e.target.value)
    }
    return <div className={styles.container}>
        <p>Сделайте ставку</p>
        <div className={styles.container_content}>
            <input placeholder={'0'} onChange={handlerChangeValue} value={value} type="number"
                   style={{color: value ? 'white' : 'rgba(112, 112, 112, 1)'}}/>
            <p style={{color: value ? 'white' : 'rgba(112, 112, 112, 1)'}}>TON</p>
        </div>
        <div className={styles.container_button}>
            {value && <div
                className={styles.container_button_elipse}></div>}
            <BtnCommon text={'Подтвердить'} width={'50%'}/>
        </div>
    </div>
}
