import styles from "../styles/menu.module.css"
function Menu({width="50em",height="30em",bgColor="#154019",children,style}){

    return(<div className={styles.container} style={{
        width:width,
        height:height,
        backgroundColor:bgColor,
        ...style
    }}>
        {children}
    </div>)
}
export default Menu;