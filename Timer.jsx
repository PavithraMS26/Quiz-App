import { useState, useEffect } from "react";

export default function Timer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('setting timout')
        const Timeout = setTimeout(onTimeOut, timeout);

        return () => {
            clearTimeout(Timeout);
        }
    }, [timeout, onTimeOut]);


    useEffect(() => {
        console.log('setting interval')
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    )
}