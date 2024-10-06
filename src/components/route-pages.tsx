import {Route, Routes} from "react-router-dom";
import {ROUTES} from "../constants/route.tsx";

export const RoutePages = () => {
    return <Routes>
        {ROUTES.map(el => <Route path={el.path} key={el.path} element={el.component}/>)}
    </Routes>
}
