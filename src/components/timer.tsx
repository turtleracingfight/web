import styles from '../styles/timer.module.scss'
import {memo, useEffect, useState} from "react";

let interval = 0
export const Timer = memo(() => {
    const [hours, setHours] = useState(10)
    const [minutes, setMinutes] = useState(60)
    const [seconds, setSeconds] = useState<number>(60)

    useEffect(() => {
        if (hours) {
            interval = setInterval(() => {
                console.log(seconds)
                if (!minutes) {
                    setHours(state => state - 1)
                    setMinutes(60)
                }
                if (!seconds) {
                    setMinutes(state => state - 1)
                }
                setSeconds(seconds ? seconds - 1 : 60)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [seconds, minutes, hours]);

    return <div className={styles.container}>
        <p>{hours}</p>
        <p>:</p>
        <p>{minutes}</p>
        <p>:</p>
        <p>{String(seconds).length > 1 ? seconds : `0${seconds}`}</p>
    </div>
})