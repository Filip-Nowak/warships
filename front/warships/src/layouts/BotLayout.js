import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import {useState} from "react";
import {useNavigate} from "react-router";
import BotGame from "../components/botGame/BotGame";

function BotLayout() {
    const [inGame, setInGame] = useState(false)
    const [ships, setShips] = useState([]);
    const navigate = useNavigate()
    const submitShips = (ships) => {
        setShips(ships);
        setInGame(true)
    }
    const back = () => {
        navigate("/")
    }

    return <>
        {/*{*/}
        {/*    inGame ?*/}
        {/*        <CreatorMenu back={back} submitShips={submitShips} online={false}/>*/}
        {/*        :*/}
        {/*        <BotGame/>*/}
        {/*}*/}
        <CreatorMenu back={back} submitShips={submitShips} online={false}/>
    </>
}

export default BotLayout