import {useEffect, useRef, useState} from "react";

function BlinkingDots({blinkSpeed=500}){
    const [content,setContent]=useState("   ");
    const timer = useRef(0);
    useEffect(() => {
        timer.current=setTimeout(()=>{
            if(content.length<3){
                setContent((newContent)=>newContent+".")
            }else{
                setContent("")
            }
        },blinkSpeed)
        return ()=>{
            clearTimeout(timer.current)
        }
    }, [content]);

    return <span>{content}</span>
}
export default BlinkingDots