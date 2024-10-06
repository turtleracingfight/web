import {useState} from "react";
import {NAMES_TURTLES} from "../constants/turtles.ts";
import {useNavigate} from "react-router-dom";
import {LIST_ROUTES} from "../constants/route.tsx";
import {Swiper, SwiperSlide} from "swiper/react";
import arrowright from '../assets/arrowright.svg'
import arrowleft from '../assets/arrowleft.svg'
import 'swiper/css';
import 'swiper/css/pagination';
import '../index.css'
import styles from '../styles/home.module.scss'
import {LIST_TURTLES, TURTLES} from "../constants/links.ts";
import {BtnCommon, BtnConnectTg} from "../components/buttons.tsx";
import {Timer} from "../components/timer.tsx";

let swiperInstance = null;
export const Home = () => {
    const navigate = useNavigate();
    const [turtle, setTurtle] = useState(0)
    const [isConnect, setIsConnect] = useState(true)

    const handlerPlusTurtle = () => {
        if (!NAMES_TURTLES[turtle + 1]) setTurtle(0)
        else setTurtle(state => state + 1)
        swiperInstance.slideNext();
    }
    const handlerMinusTurtle = () => {
        if (!turtle) setTurtle(() => NAMES_TURTLES.length)
        setTurtle(state => state - 1)
        swiperInstance.slidePrev()
    }
    const handlerNavigateToAllTurtles = () => navigate(LIST_ROUTES.listTurtles)

    return <div className={styles.container}>
        <div className={styles.container_turtles}>
            <Swiper
                onSwiper={(swiper) => swiperInstance = swiper}
                slidesPerView="auto"
                loop={true}
                centeredSlides={true}
                spaceBetween={30}
            >
                {TURTLES.map(el => <SwiperSlide key={el.id}
                                                className={styles.container_turtles_slider}>
                    {el.id === turtle ?
                        <img className={styles.container_turtles_slider_active} src={el.img} alt="turtle"/> : <img
                            style={{width: '90%'}}
                            src={el.img}
                            alt=""/>}
                </SwiperSlide>)}
                <div className={styles.container_turtles_additional}></div>
                <div className={styles.container_turtles_header}>
                    <div className={styles.container_turtles_header_ellipse}></div>
                    <div className={styles.container_turtles_header_ellipse}></div>
                    <img src={arrowleft} alt="arrow-left" onClick={handlerMinusTurtle}/>
                    <p className={styles.container_turtles_header_name}>{NAMES_TURTLES[turtle]}</p>
                    <img src={arrowright} alt="arrow-right" onClick={handlerPlusTurtle}/>
                </div>
                <div className={styles.container_turtles_ton}>
                    <p>Поставили:</p>
                    <p>0.4 TON</p>
                </div>
            </Swiper>
        </div>
        <div className={styles.container_bl}>
            <div className={styles.container_bl_list}>
                <div className={styles.container_bl_list_hero}>{LIST_TURTLES.map(el => <div key={el.id}><img
                    src={el.img}
                    alt="turtle"/>
                </div>)}</div>
                <BtnCommon handlerClick={handlerNavigateToAllTurtles}
                           text={'Список черепах'}/>
            </div>
            <div className={styles.container_bl_footer}>
                <Timer/>
                <div className={styles.container_bl_footer_button}>
                    <div className={styles.container_bl_footer_button_ellipse}></div>
                    {isConnect ? <BtnConnectTg/> : <BtnCommon height={'38px'} text={'Сделать ставку'} width={'170px'}/>}
                </div>
            </div>
        </div>
    </div>
}
