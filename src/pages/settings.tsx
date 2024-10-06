import styles from '../styles/settings.module.scss'
import {useState} from "react";
import {BtnCommon} from "../components/buttons.tsx";
import flRussia from '../assets/russia.svg'

export const Settings = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handlerLanguage = () => setIsOpen(!isOpen)
    return <div className={styles.container}>
        <div className={styles.container_lang}
             style={{height: isOpen ? '20vh' : '7vh'}}>
            <div className={styles.container_lang_button}>
                <BtnCommon height={'40px'} text={'Выберите язык'}
                           handlerClick={handlerLanguage}
                           rtArrow={isOpen}
                           style={{
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               paddingLeft: '5%',
                               outline: "none"
                           }}/>
            </div>
            {isOpen && <div className={styles.container_lang_choose}>
                <p>Русский <img src={flRussia} alt="flag"/></p>
                <p>Русский <img src={flRussia} alt="flag"/></p>
            </div>}
        </div>
    </div>
}
