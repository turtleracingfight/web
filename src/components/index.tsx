import {RoutePages} from "./route-pages.tsx";
import {Header} from "./header.tsx";
import {Navigation} from "./navigation.tsx";

export const Layout = () => {
    return <div style={{margin:'0 5%'}}>
        <Header/>
        <RoutePages/>
        <Navigation/>
    </div>
}
