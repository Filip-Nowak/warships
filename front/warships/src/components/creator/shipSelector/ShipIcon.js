import styles from "./shipSelector.module.css"
function ShipIcon({size,selected}){
    return <div style={{display:"flex",alignItems:"center",justifyContent:"right"}}><div className={styles.shipCell} style={selected?{backgroundColor: "#001801"}:{}}> </div>{[...Array(size-1)].map(()=><><div className={styles.shipConnect} style={selected?{backgroundColor: "#001801"}:{}}></div><div className={styles.shipCell} style={selected?{backgroundColor: "#001801"}:{}}></div></>)}</div>
}
export default ShipIcon