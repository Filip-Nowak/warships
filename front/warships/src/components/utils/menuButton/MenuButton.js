import styles from "./menuButton.module.css"
function MenuButton({containerStyle,msgStyle,message,handleClick}){
    return <div className={styles.container} style={containerStyle} onClick={handleClick}>
        <div className={styles.msg} style={msgStyle}>{message}</div>
    </div>
}
export default MenuButton