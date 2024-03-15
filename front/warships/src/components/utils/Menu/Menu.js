import styles from "./menu.module.css"
function Menu({containerStyle,children}){
    return <div className={styles.container} style={containerStyle}>{children}</div>
}
export default Menu;