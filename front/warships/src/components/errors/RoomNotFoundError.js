import styles from "./error.module.css"
function RoomNotFoundError(){
    return <div className={styles.errorContainer}><div className={styles.message}>room not found</div></div>
}
export default RoomNotFoundError