import {memo, useState} from "react";
import wallet from '../assets/wallet.svg'
import settings from '../assets/settings.svg'
import styles from '../styles/header.module.scss'
import {useNavigate} from "react-router-dom";

const countTon = 1.533

export const Header = memo(() => {
    const navigate = useNavigate()
    const [connected, setConnected] = useState(false);
    const handlerConnectWallet = () => {
        setConnected(true)
        navigate('/connect')
    }
    const handlerNavigateToSettings = () => navigate('/settings')

    return <div className={styles.container}>
        <div><img src={settings} alt="settings" onClick={handlerNavigateToSettings}/></div>
        <div className={styles.container_wallet}>
            <p>{connected ? `${countTon} TON` : 'Подключить'}</p>
            <img onClick={handlerConnectWallet} src={wallet} alt="wallet"/>
        </div>
    </div>
})