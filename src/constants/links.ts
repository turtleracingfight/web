import activeHome from '../assets/home-active.svg'
import activeFAQ from '../assets/FAQ-active.svg'
import activeStats from '../assets/active-stats.svg'
import faq from '../assets/FAQ.svg'
import home from '../assets/home.svg'
import stats from '../assets/stats.svg'
import gladiator from '../assets/turtles/gladiator.svg'
import track from '../assets/turtles/track.svg'
import ninja from '../assets/turtles/ninja.svg'
import turtles from "../assets/turtles/turtles.svg";
import impulse from "../assets/turtles/impulse.svg";
import moon from "../assets/turtles/moon.svg";
import money from "../assets/turtles/money.svg";
import wallet from "../assets/turtles/wallet.svg";
import percent from "../assets/turtles/percent.svg";

export const LINKS = [
    {id: 1, activeImg: activeStats, img: stats, path: '/stats'},
    {id: 2, activeImg: activeHome, img: home, path: '/home'},
    {id: 3, activeImg: activeFAQ, img: faq, path: '/info'},
]

export const LIST_TURTLES = [
    {id: 1, img: gladiator},
    {id: 2, img: track},
    {id: 3, img: ninja},
    {id: 4, img: impulse},
]

export const INFO_LIST = [
    {
        id: 1,
        text: 'В игре участвуют 10 черепах. Участники могут делать ставки на любое количество черепах и на любую из них',
        svg: turtles
    },
    {id: 2, text: 'Победителем считается черепаха, на которую поставили меньше всего', svg: impulse},
    {id: 3, text: 'Забег заканчивается в субботу вечером', svg: moon},
    {id: 4, text: 'Сумма ставок делится между всеми игроками, которые поставили на победившую черепаху', svg: money},
    {id: 5, text: 'Сумма выигрыша автоматически зачисляется на ваш кошелек', svg: wallet},
    {id: 6, text: 'Наша комиссия составляет 10% от общей суммы ставок', svg: percent},
]

export const TURTLES = [
    {id: 1, img: gladiator},
    {id: 2, img: track},
    {id: 3, img: ninja},
    {id: 4, img: impulse},
    // {id: 6, img: zoom},
    // {id: 7, img: zoom},
    // {id: 8, img: zoom},
    // {id: 9, img: zoom},
    // {id: 10, img: zoom},
    // {id: 5, img: zoom},
    // {id: 6, img: zoom},
]
