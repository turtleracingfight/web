import activeHome from '../assets/links/home-active.svg'
import activeStats from '../assets/links/stats-active.svg'
import activeFaq from '../assets/links/FAQ-active.svg'
import faq from '../assets/links/FAQ.svg'
import home from '../assets/links/home.svg'
import stats from '../assets/links/stats.svg'
import gladiator from '../assets/turtles/gladiator.svg'
import track from '../assets/turtles/track.svg'
import turtles from "../assets/turtles/turtles.svg";
import impulse from "../assets/turtles/impulse.svg";
import zoom from "../assets/turtles/zoom.svg";
import corkscrew from "../assets/turtles/corkscrew.svg";
import stronghold from "../assets/turtles/stronghold.svg";
import formula from "../assets/turtles/formula.svg";
import nitro from "../assets/turtles/nitro.svg";
import ninja from "../assets/turtles/ninja.svg";
import parapsi from "../assets/turtles/parapsi.svg";
import moon from "../assets/turtles/moon.svg";
import money from "../assets/turtles/money.svg";
import wallet from "../assets/turtles/wallet.svg";
import percent from "../assets/turtles/percent.svg";

export const LINKS = [
    {id: 1, visible: activeStats, hidden: stats, path: '/stats'},
    {id: 2, visible: activeHome, hidden: home, path: '/home'},
    {id: 3, visible: activeFaq, hidden: faq, path: '/info'},
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
    {id: 0, img: zoom},
    {id: 1, img: stronghold},
    {id: 2, img: track},
    {id: 3, img: gladiator},
    {id: 4, img: corkscrew},
    {id: 5, img: formula},
    {id: 6, img: impulse},
    {id: 7, img: nitro},
    {id: 8, img: ninja},
    {id: 9, img: parapsi},
]
