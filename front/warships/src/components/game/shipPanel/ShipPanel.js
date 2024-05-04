import styles from "./shipPanel.module.css"
import MenuButton from "../../utils/menuButton/MenuButton";
import Timer from "../../utils/timer/Timer";

function ShipPanel({children, time, forfeit,disabled}) {
    return <div>
        <div style={{width: "24rem", height: "2.5rem"}}>
            <div style={{
                height: "100%",
                width: "75%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div className={styles.verticalConnect}></div>
                <div className={styles.verticalConnect}></div>
            </div>
        </div>
        <div style={{display: "flex"}}>
            <div className={styles.panelBorder}>
                <div style={{background: "black"}}>
                    {children}</div>
                <div className={styles.bottomPanel}>
                    <div style={{display:"flex",alignItems:"center",width:"40%",justifyContent:"center"}}>
                        <MenuButton containerStyle={{
                            borderRadius: 0,
                            color: "#0d2502",
                            backgroundColor: "red",
                            fontSize: "1.5rem",
                            width:"70%",
                            margin:0

                        }} message={"forfeit"} handleClick={forfeit}></MenuButton>
                    </div>
                    <div style={{background:"lime",width:"2%",backgroundColor:"#420000"}}></div>
                    <div className={styles.timer}>
                    <Timer time={time} dangerZone={5} disabled={disabled} /></div>
                </div>
            </div>
        </div>
    </div>
}

export default ShipPanel