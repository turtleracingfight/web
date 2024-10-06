import styles from '../styles/winning.module.scss'
import tokens from '../assets/token.svg'
import {BtnCommon} from "../components/buttons.tsx";
import {useState} from "react";

export const Winning = () => {
    const [value, setValue] = useState<string>('')
    const [isInput, setIsInput] = useState(false)
    const [isWinning, setIsWinning] = useState(false)
    return <div className={styles.container}>
        {isWinning ? <img src={tokens} alt="tokens"/> : null}
        <div className={styles.container_content}>
            <div className={styles.container_content_header}>
                {isWinning ? <>
                    <p>Поздравляем!</p>
                    <p>Ваш выигрыш составил:</p></> : <p style={{color: 'rgba(112, 112, 112, 1)'}}>Сделайте ставку</p>}
            </div>
            {isWinning ? <div className={styles.container_content_winning}>
                <p>2.14 TON</p>
            </div> : <div style={{justifyContent: isInput ? 'flex-start' : 'center'}}
                          className={styles.container_content_winning} onClick={() => setIsInput(true)}
                          onBlur={() => setIsInput(false)}>
                {isInput ? <input autoFocus={true} type={'number'} value={value}
                                  onChange={(e) => setValue(e.target.value)}/> : null}
                <p style={{color: value.length || isInput ? 'white' : 'rgba(112, 112, 112, 1)'}}>{isInput ? 'TON' : value.length ? value + ' TON' : '0 TON'} </p>
            </div>}
            {isWinning ? <div className={styles.container_content_button}>
                <div className={styles.container_content_button_elipse}></div>
                <BtnCommon text={'Забрать'} width={'117px'} height={'38px'}/>
            </div> : <div className={styles.container_content_button}>
                {value.length ? <div className={styles.container_content_button_elipse}></div> : null}
                <BtnCommon text={'Подтвердить'} width={'154px'} height={'38px'}/>
            </div>}
        </div>
        {isWinning ? <p>*Сумма будет автоматически зачислена на ваш кошелек</p> : null}
    </div>
}
