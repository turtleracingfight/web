import styles from '../styles/home.module.scss'
import arrowRight from '../assets/arrowright.svg'
import arrowLeft from '../assets/arrowleft.svg'
import {useEffect, useState} from "react";
import {NAMES_TURTLES} from "../constants/turtles.ts";
import stylesCommon from '../styles/common.module.scss'
import {LIST_TURTLES, TURTLES} from "../constants/links.ts";
import {Timer} from "../components/timer.tsx";
import {BtnConnectTg} from "../components/buttons.tsx";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const [turtle, setTurtle] = useState(0)

    const handlerPlusTurtle = () => {
        if (!NAMES_TURTLES[turtle + 1]) setTurtle(0)
        else setTurtle(state => state + 1)
    }
    const handlerMinusTurtle = () => {
        if (!turtle) setTurtle(() => NAMES_TURTLES.length)
        setTurtle(state => state - 1)
    }

    useEffect(() => {
        const divWidth = document.getElementById('screen-turtle')
        // @ts-ignore
        console.log(divWidth.scrollWidth)
    }, []);

    const handlerNavigateToAllTurtles = () => navigate('/all-turtles')

    return <div className={styles.container} id={'screen-turtle'}>
        <div className={styles.container_header}>
            <p className={stylesCommon.ellipse} style={{top: '13.5vh'}}></p>
            <img src={arrowLeft} alt="arrow-left" onClick={handlerMinusTurtle}/>
            <p className={styles.container_header_name}>{NAMES_TURTLES[turtle]}</p>
            <img src={arrowRight} alt="arrow-right" onClick={handlerPlusTurtle}/>
        </div>
        <div className={styles.container_turtles}>
            {/*<div className={styles.container_turtles_back}></div>*/}
            {/*<div className={styles.container_turtles_bet}>*/}
            {/*    <p>Поставили:</p>*/}
            {/*    <p><b>123.2 TON</b></p>*/}
            {/*</div>*/}
            {LIST_TURTLES.map(el => <div><img src={el.img} alt=""/></div>)}
            {/*{LIST_TURTLES.map(el => <img src={el.img} alt=""/>)}*/}
            {/*el.id === 1 ?*/}
            {/*    <div style={{minWidth: '50%',}}><img style={{position: 'absolute', top: "19%"}}*/}
            {/*    //                                      src={el.img} alt=""/></div> :*/}
            {/*    // <img src={el.img} alt=""/> :*/}
            {/*    // : <div style={{minWidth: '10%', height: '165px'}}>2</div>)}*/}
        </div>
        <div className={styles.container_bl}>
            <div className={styles.container_bl_list}>
                <div className={styles.container_bl_list_hero}>{TURTLES.map(el => <div key={el.id}><img src={el.img}
                                                                                                        alt="turtle"/>
                </div>)}</div>
                <div className={styles.container_bl_list_all}>
                    <button onClick={handlerNavigateToAllTurtles}><p>Список черепах</p> <img src={arrowRight} alt="arrow-right"/></button>
                </div>
            </div>
            <Timer/>
            {true ? <BtnConnectTg/> : <button className={styles.container_bl_make_bet}>
                <p>Сделать ставку</p>
                <img src={arrowRight} alt="tg"/>
            </button>}
        </div>
    </div>
}
