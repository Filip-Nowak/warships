import MenuButton from "../utils/menuButton/MenuButton";
import {useNavigate} from "react-router";
import styles from "./error.module.css"
import {useContext, useEffect} from "react";
import LoadingContext from "../context/LoadingContext";
function ServerError({message}){
    const navigate=useNavigate()
    const loadingContext= useContext(LoadingContext)
    const handleClick=()=>{
        navigate("/")
    }
    useEffect(() => {
        loadingContext.setLoading(false)
    }, []);
    return <div>
        <div className={styles.serverError}>{message}</div>
        <MenuButton message={"return to homepage"} handleClick={handleClick} containerStyle={{marginLeft:"auto",marginRight:"auto",marginTop:"2rem"}}/>
    </div>
}
export default ServerError