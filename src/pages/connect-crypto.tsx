import {BtnCommon, BtnConnectTg} from "../components/buttons.tsx";
import styles from '../styles/connect.module.scss'
import connectTurtle from '../assets/connect.svg'
import {useState} from "react";

const ConnectWallet = () => {
    return <div className={styles.container_connect}>
        <p>Для участия в игре необходимо подключить кошелек и сделать ставку</p>
        <BtnConnectTg/>
    </div>
}

const ConnectedWallet = () => {
    return <div className={styles.container_connected}>
        <p>Ваша баланс:</p>
        <p>0,4256 TON</p>
        <BtnCommon text={'Пополнить баланс'} width={'188px'} height={'38px'}/>
    </div>
}

export const ConnectCrypto = () => {
    const [isConnected, setIsConnected] = useState(true)
    return <div className={styles.container}>
        {isConnected ? <ConnectedWallet/> : <ConnectWallet/>}
        <div className={styles.container_footer}>
            <div style={{height: isConnected ? '13vh' : '20vh'}} className={styles.container_footer_back}></div>
            {!isConnected && <img src={connectTurtle} alt="connect-turtle"/>}
        </div>
    </div>
}
