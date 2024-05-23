import styles from "./menu.module.css"
function Menu({containerStyle,children,className}){
    return <div className={styles.container+" "+className} style={containerStyle}>
        {children}
    </div>

}
export default Menu;