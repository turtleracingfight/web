import styles from '../styles/navigation.module.scss'
import stylesCommon from '../styles/common.module.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {LINKS} from "../constants/links.ts";

const helperBorderStyle = (path: string) => {
    switch (path) {
        case '/home':
            return 'linear-gradient(90deg, #010101 0%, #3F4B25 51%, #010101 100%)'
        case '/stats':
            return 'linear-gradient(90deg, #010101 0%, #3F4B25 20%, #010101 100%)'
        case '/info':
            return 'linear-gradient(90deg, #010101 0%, #3F4B25 79.84%, #010101 100%)'

    }
}

export const Navigation = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate();
    return <div className={styles.container}>
        <div className={styles.container_links}
             style={{
                 border: '2px solid',
                 borderImageSource: helperBorderStyle(pathname),
                 borderImageSlice: 1
             }}>
            {LINKS.map(el => <button key={el.id} onClick={() => navigate(el.path)}>
                    <p className={`${el.path === pathname && stylesCommon.ellipse}`}></p>
                    <img src={el.path === pathname ? el.activeImg : el.img} alt={el.path}/>
                </button>
            )}
        </div>
    </div>
}
