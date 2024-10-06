import {RoutePages} from "./route-pages.tsx";
import {Header} from "./header.tsx";
import {Navigation} from "./navigation.tsx";
import {helperExcessMargin, helperUnnecessaryNavigation} from "../utils/usefulFunc.ts";
import {useLocation} from "react-router-dom";

export const Layout = () => {
    const {pathname} = useLocation()
    const isMargin = helperExcessMargin(pathname)
    return <>
        {/*<Winning/>*/}
        <div style={{margin: isMargin ? '' : '0 5%'}}>
            <Header isMargin={isMargin}/>
            <RoutePages/>
            {helperUnnecessaryNavigation(pathname) ? null : <Navigation/>}
        </div>
    </>
}
