import {useEffect, useRef, useState} from "react";

function BlinkingDots({blinkSpeed=500}){
    const [content,setContent]=useState("   ");
    setTimeout(()=>{
        if(content.length<3){
            setContent((newContent)=>newContent+".")
        }else{
            setContent("")
        }
    },blinkSpeed)
    return <span>{content}</span>
}
export default BlinkingDots