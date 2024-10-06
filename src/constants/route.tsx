import {ListTurtles} from "../pages/list-turtles.tsx";
import {Navigate} from "react-router-dom";
import {Home} from "../pages/home.tsx";
import {Stats} from "../pages/stats.tsx";
import {Info} from "../pages/info.tsx";
import {ConnectCrypto} from "../pages/connect-crypto.tsx";
import {Settings} from "../pages/settings.tsx";

export const LIST_ROUTES = {
    listTurtles: '/list-turtles',
    home: '/home',
    stats: '/stats',
    info: '/info',
    connect: '/connect',
    settings: '/settings',
    another: '/*',
    main: '/'
}

export const ROUTES = [
    {path: LIST_ROUTES.main, component: <Navigate to={LIST_ROUTES.home}/>},
    {path: LIST_ROUTES.listTurtles, component: <ListTurtles/>},
    {path: LIST_ROUTES.home, component: <Home/>},
    {path: LIST_ROUTES.stats, component: <Stats/>},
    {path: LIST_ROUTES.info, component: <Info/>},
    {path: LIST_ROUTES.connect, component: <ConnectCrypto/>},
    {path: LIST_ROUTES.settings, component: <Settings/>},
    {path: LIST_ROUTES.another, component: <Navigate to={LIST_ROUTES.home}/>},
]
