import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home.tsx";
import {ConnectCrypto} from "../pages/connect-crypto.tsx";
import {Settings} from "../pages/settings.tsx";
import {AllTurtles} from "../pages/all-turtles.tsx";
import {Stats} from "../pages/stats.tsx";
import {Winning} from "../modals/winning.tsx";
import {MakeBet} from "../modals/make-bet.tsx";
import {Info} from "../pages/info.tsx";

export const RoutePages = () => {
    return <Routes>
        <Route key="/" path="/" element={<Navigate to="/home"/>}/>
        <Route key="/stats" path="/stats" element={<Stats/>}/>
        <Route key="/home" path="/home" element={<Home/>}/>
        {/*<Route key="/home" path="/home" element={<Winning/>}/>*/}
        {/*<Route key="/home" path="/home" element={<MakeBet/>}/>*/}
        <Route key="/connect" path="/connect" element={<ConnectCrypto/>}/>
        <Route key="/settings" path="/settings" element={<Settings/>}/>
        <Route key="/all-turtles" path="/all-turtles" element={<AllTurtles/>}/>
        <Route key="/info" path="/info"
               element={<Info/>}/>
    </Routes>
}
