function ModeButton({modeName,handleClick}){
    return <div style={{
        width:"10em",
        height:"10em",
        marginLeft:"auto",
        marginRight:"auto",
        margin:"auto",
        backgroundColor:"#154019",
        borderRadius:"2em",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"150%"

    }} onClick={handleClick}>
        <div style={{

        }}>{modeName}</div>
    </div>

}
export  default ModeButton