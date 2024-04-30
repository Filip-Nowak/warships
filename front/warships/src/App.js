import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout";
import CreateRoomLayout from "./layouts/CreateRoomLayout";
import RootLayout from "./layouts/RootLayout";
import RoomLayout, {roomLoader} from "./layouts/RoomLayout";
import OnlineLayout from "./layouts/OnlineLayout";
import "./App.css"
import BotLayout from "./layouts/BotLayout";
import {useState} from "react";

function App() {
    const [username, setUsername] = useState("")
    console.log(username)
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} element={<RootLayout/>}>
                <Route index element={<HomeLayout setUsername={setUsername}/>}/>
                <Route path={"bot"} element={<BotLayout/>}/>
                <Route path={"online"} element={<OnlineLayout username={username} setUsername={setUsername}></OnlineLayout>}>
                    <Route path={"create-room"} element={<CreateRoomLayout/>}/>
                    <Route path={"room/:roomId"} loader={roomLoader} element={<RoomLayout/>}/>
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}

export default App;
