import {useEffect, useState} from "react";

function useTimer(callback) {
    console.log("useTimer")
    const [countdown, setCountdown] = useState(-1);
    useEffect(() => {
        console.log("in effect")
        if (countdown >= 0) {
            if (countdown === 0) {
                callback()
            } else {
                setTimeout(
                    () => setCountdown(prevState => {
                            return prevState - 1
                        }
                    ), 1000
                )
            }
        }
    }, [callback, countdown]);
    return [countdown, setCountdown];
}

export default useTimer