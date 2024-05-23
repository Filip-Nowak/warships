import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout";
import CreateRoomLayout from "./layouts/CreateRoomLayout";
import RootLayout from "./layouts/RootLayout";
import RoomLayout, {roomLoader} from "./layouts/RoomLayout";
import OnlineLayout from "./layouts/OnlineLayout";
import "./App.css"
import BotLayout from "./layouts/BotLayout";
import {useEffect, useRef, useState} from "react";
import ServerError from "./components/errors/ServerError";

function App() {
    const [username, setUsername] = useState("")
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} element={<RootLayout/>}>
                <Route index element={<HomeLayout setUsername={setUsername}/>}/>
                <Route path={"bot"} element={<BotLayout/>}/>
                <Route path={"online"}
                       element={<OnlineLayout username={username} setUsername={setUsername}></OnlineLayout>}>
                    <Route path={"create-room"} element={<CreateRoomLayout/>}/>
                    <Route path={"room/:roomId"} element={<RoomLayout/>}/>
                </Route>
                <Route path={"*"} element={<ServerError message={"page not found"}/>}/>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}
//     const handleShot = (pos) => {
//         setPossible(bot.current.botShooter.possibleLines);
//         setFields(prevState => {
//             const {x,y}=pos;
//             if (prevState[y][x]===1) {
//                 prevState[y][x]=2;
//                 let sunken=true;
//                 const callback = (x, y, fields) => {
//                     if (getField(x, y, fields) === 2) {
//                         fields[y][x] = 5
//                         forCrossFields(x, y, fields, callback)
//                     }else if(getField(x,y,fields) === 1){
//                         sunken=false;
//                     }
//                 }
//                 const clonedFields=cloneFields(prevState);
//                 forCrossFields(x, y, clonedFields, callback)
//                 bot.current.shotResult(sunken?2:1,pos);
//
//             } else if (prevState[pos.y][pos.x] === 0) {
//                     bot.current.shotResult(0, pos)
//                     prevState[pos.y][pos.x] = 4
//                 }
//
//                 return [...prevState];
//             }
//         )
//     }
//     useEffect(() => {
//         setPossible(bot.current.botShooter.possibleLines)
//         // bot.current.shotResult(0,{x:0,y:1})
//     }, []);
//     const bot = useRef(new SmartBot(handleShot));
//     const [possible, setPossible] = useState({xd: []});
//     const [fields, setFields] = useState(
//         [
//             [1, 0, 1, 0, 1, 1, 1, 1, 0, 0,],
//             [1, 0, 1, 0, 0, 0, 0, 0, 0, 1,],
//             [1, 0, 1, 0, 1, 1, 1, 1, 0, 1,],
//             [1, 0, 1, 0, 0, 0, 0, 0, 0, 1,],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
//             [1, 0, 1, 0, 1, 1, 1, 1, 0, 0,],
//             [1, 0, 1, 0, 0, 0, 0, 0, 0, 1,],
//             [1, 0, 1, 0, 1, 1, 1, 1, 0, 1,],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
//             [1, 1, 1, 0, 1, 1, 1, 1, 0, 1,],
//         ]
//     )
//     const ship = bot.current.botShooter.hitShip;
//     return <div><Board boardInfo={BoardInfoFactory.getSeaBoard()} fields={fields} handleFieldClick={(x,y)=>{
//         bot.current.takeShot(x,y)
//     }}/>
//         <MenuButton message={"shoot"} handleClick={() => {
//             bot.current.takeShot()
//         }}/>
//         <div style={{display: "flex"}}>
//             <div>
//                 {Object.keys(possible).map((key) => {
//                     return <div style={{display: "flex", width: "200px"}}>
//                         <div style={{fontSize: 20, color: "red", width: 30}}>{key}</div>
//                         {possible[key].map(v => <div>{v}</div>)}</div>;
//                 })}</div>
//             <div style={{width:200}}>
//                 hitShip
//                 {
//                     ship !== null ?
//                         ship.map((v) => {
//                             return <div>{v.x} : {v.y}</div>
//                         })
//                         : "null"
//                 }
//             </div>
//             <div style={{width:100}}>
//                 continues
//                 {bot.current.botShooter.possibleContinues.map(v=>{
//                     return <div>{v.x} {v.y}</div>
//                 })}
//             </div>
//             <div style={{width:100}}>
//                 first <div>{bot.current.botShooter.first.x} : {bot.current.botShooter.first.y}</div>
//                 last <div>{bot.current.botShooter.last.x} : {bot.current.botShooter.last.y}</div>
//             </div>
//         </div>
//
//     </div>
// }


export default App;
