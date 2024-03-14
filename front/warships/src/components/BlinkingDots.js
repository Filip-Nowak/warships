import {useEffect, useRef, useState} from "react";

function BlinkingDots(){
    const [content,setContent]=useState("   ");
    setTimeout(()=>{
        if(content.length<3){
            setContent((newContent)=>newContent+".")
        }else{
            setContent("")
        }
    },500)
    return <span>{content}</span>
}
export default BlinkingDots