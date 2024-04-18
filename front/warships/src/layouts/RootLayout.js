import {Outlet} from "react-router";
import OnlineContext from "../components/context/OnlineContext";
import {useState} from "react";
import LoadingContext from "../components/context/LoadingContext"
import FullScreenInfo from "../components/utils/loading/FullScreenInfo";
function RootLayout(){
    const [loading, setLoading] = useState(false)
    return <LoadingContext.Provider value={{loading: loading,setLoading:setLoading}} >
        <Outlet/>
        {loading?<FullScreenInfo loading={loading}>loading</FullScreenInfo>:"" }
    </LoadingContext.Provider>
}
export default RootLayout