function ModeButton({modeName,handleClick}){
    return <div style={{
        width:"12rem",
        height:"12rem",
        marginLeft:"auto",
        marginRight:"auto",
        margin:"auto",
        backgroundColor:"#154019",
        borderRadius:"2rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"1.5rem"

    }} onClick={handleClick}>
        <div style={{

        }}>{modeName}</div>
    </div>

}
export  default ModeButton