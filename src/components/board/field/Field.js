import styles from "./fieldStyle.module.css"
function Field({x,y,style,handleClick, isDisabled,fieldType}){
    const handleFieldClick=()=>{
        if(!isDisabled(x,y)){
            handleClick();
        }
    }
    console.log(fieldType)
    return <div className={styles.field+" "+fieldType+" "+style} onClick={handleFieldClick}></div>
}
export default Field;