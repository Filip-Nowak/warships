import {useEffect, useRef, useState} from "react";

function useTimer(callback, d = 1000) {
    console.log("useTimer")
    const [countdown, setCountdown] = useState(0);
    const time=useRef(null)
    useEffect(() => {
        let timeoutId;
        if(time.current!==null|| countdown!==0){
            if(countdown===0&&time.current>0){
                time.current=null;
                return;
            }
            if(time.current===null){
                time.current=countdown
            }
            if(time.current>0){
                setTimeout(()=> {
                    time.current -= (d/1000);
                    setCountdown(time.current)
                },d)
            }else{
                setCountdown(0)
                callback()
                time.current=null
            }
        }
        return () => {
            clearTimeout(timeoutId)
        }
    }, [countdown]);
    return [countdown, setCountdown];
}

export default useTimer