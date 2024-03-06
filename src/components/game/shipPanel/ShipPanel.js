import styles from "./shipPanel.module.css"
function ShipPanel({children}){
    return <div style={{width:"70%"}}>
        <div style={{width:"46em",height:"5em"}}>
            <div style={{height:"100%",width:"75%",marginLeft:"auto",marginRight:"auto",display:"flex",justifyContent:"space-between"}}>
                <div className={styles.verticalConnect}></div>
                <div className={styles.verticalConnect}></div>
            </div>
        </div>
        <div style={{display:"flex"}}>
            <div className={styles.panelBorder}>
            {children}
            </div>
            {/*<div style={{height:"46em",width:"100%",display:"flex",alignItems:"center"}}>*/}
            {/*    <div style={{width:"100%",height:"75%",display:"flex",flexDirection:"column-reverse"}}>*/}
            {/*        <div className={styles.horizontalConnect}></div>*/}
            {/*        <div style={{height:"26em"}}></div>*/}
            {/*        <div className={styles.horizontalConnect}></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>
}
export default ShipPanel