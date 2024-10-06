import styles from '../styles/components/navigation.module.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {LINKS} from "../constants/links.ts";
import {helperNavigationStyles} from "../utils/usefulFunc.ts";
import {memo} from "react";

export const Navigation = memo(() => {
    const {pathname} = useLocation()
    const navigate = useNavigate();
    return <div className={styles.container}>
        <div className={styles.container_content} style={{
            background: `linear-gradient(90deg, #010101 0%, #3F4B25 ${helperNavigationStyles(pathname)}, #010101 100%)`,
        }}>
            <div className={styles.container_content_links}
                 style={{background: `radial-gradient(40.51% 100% at ${helperNavigationStyles(pathname)} 0%, rgba(136, 138, 53, 0.3) 0%, rgba(1, 1, 1, 0.1) 100%), linear-gradient(179.93deg, #0C0C0C -1.98%, #000000 99.94%)`}}>
                {LINKS.map(el => <button key={el.id} onClick={() => navigate(el.path)}>
                        <div className={`${el.path === pathname && styles.container_content_links_ellipse}`}></div>
                        <img src={el.path === pathname ? el.visible : el.hidden} alt={el.path}/>
                    </button>
                )}
            </div>
        </div>
    </div>
})
