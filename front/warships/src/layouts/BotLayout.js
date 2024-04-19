import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import {useState} from "react";
import {useNavigate} from "react-router";
import BotGame from "../components/botGame/BotGame";
import field from "../components/board/field/Field";

function BotLayout() {
    const [inGame, setInGame] = useState(false)
    const [playerFields, setPlayerFields] = useState([]);
    const navigate = useNavigate()
    const submitShips = (fields) => {
        setPlayerFields(fields);
        setInGame(true)
    }
    const back = () => {
        navigate("/")
    }
    return <>
        {
            !inGame ?
                <CreatorMenu back={back} submitShips={submitShips} online={false}/>
                :
                <BotGame playerFields={playerFields} setPlayerFields={}/>
        }
    </>
}

export default BotLayout