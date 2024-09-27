import styles from '../styles/all-turtles.module.scss'
import {BtnCommon} from "../components/buttons.tsx";
import {ALL_TURTLES} from "../constants/turtles.ts";

export const AllTurtles = () => {
    return <div className={styles.container}>
        {ALL_TURTLES.map(el => <div className={styles.container_bl}>
            <div className={styles.container_bl_turtle}>
                <div className={styles.container_bl_turtle_content}>
                    <div className={styles.container_bl_turtle_content_elipse}></div>
                    <div className={styles.container_bl_turtle_content_elipse}></div>
                    <img src={el.svg} alt={el.name}/>
                    <p>{el.name}</p>
                </div>
                <div className={styles.container_bl_turtle_bet}>
                    <p>{(Math.random() * 100).toFixed(2)} TON</p>
                    <BtnCommon text={'Сделать ставку'} width={'90%'}/>
                </div>
            </div>
            <div className={styles.container_bl_border}></div>
        </div>)}
    </div>
}
