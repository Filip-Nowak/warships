import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout";
import CreateRoomLayout from "./layouts/CreateRoomLayout";
import RootLayout from "./layouts/RootLayout";
import RoomLayout, {roomLoader} from "./layouts/RoomLayout";
import OnlineLayout from "./layouts/OnlineLayout";
import "./App.css"
import BotLayout from "./layouts/BotLayout";
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} element={<RootLayout/>}>
                <Route index element={<HomeLayout/>}/>
                <Route path={"bot"} element={<BotLayout/>}/>
                <Route path={"online"} element={<OnlineLayout></OnlineLayout>}>
                    <Route path={"create-room"} element={<CreateRoomLayout/>}/>
                    <Route path={"room/:roomId"} loader={roomLoader} element={<RoomLayout/>}/>
                </Route>
            </Route>
        )
    )
    return<RouterProvider router={router}/>
}
export default App;
