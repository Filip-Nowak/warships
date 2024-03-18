import styles from "./shipPanel.module.css"
function ShipPanel({children}){
    return <div style={{width:"70%"}}>
        <div style={{width:"23rem",height:"2.5rem"}}>
            <div style={{height:"100%",width:"75%",marginLeft:"auto",marginRight:"auto",display:"flex",justifyContent:"space-between"}}>
                <div className={styles.verticalConnect}></div>
                <div className={styles.verticalConnect}></div>
            </div>
        </div>
        <div style={{display:"flex"}}>
            <div className={styles.panelBorder}>
            {children}
            </div>
        </div>
    </div>
}
export default ShipPanel