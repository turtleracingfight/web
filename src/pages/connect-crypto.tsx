import {BtnCommon, BtnConnectTg} from "../components/buttons.tsx";
import styles from '../styles/connect.module.scss'
import connectTurtle from '../assets/connect.svg'

const ConnectWallet = () => {
    return <div className={styles.container_connect}>
        <p>Для участия в игре необходимо подключить кошелек и сделать ставку</p>
        <BtnConnectTg/>
    </div>
}

const ConnectedWallet = () => {
    return <div className={styles.container_connected}>
        <p>Для участия в игре необходимо подключить кошелек и сделать ставку</p>
        <p>0,4256 TON</p>
        <BtnCommon text={'Пополнить баланс'}/>
    </div>
}

const isConnected = true

export const ConnectCrypto = () => {
    return <div className={styles.container}>
        {isConnected ? <ConnectedWallet/> : <ConnectWallet/>}
        <div className={styles.container_footer}>
            <div className={styles.container_footer_back}>2</div>
            <img src={connectTurtle} alt="connect-turtle"/>
        </div>
    </div>
}
