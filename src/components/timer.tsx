import styles from "../styles/components/timer.module.scss";
import { memo, useEffect, useState } from "react";
import { useControlCenter } from "../hooks/useControlCenter.tsx";

let interval = 0;
export const Timer = memo(() => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { requestGetNext } = useControlCenter();

  useEffect(() => {
    (async () => {
      const { hours, minutes, seconds } = await requestGetNext();
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    })();
  }, []);

  useEffect(() => {
    if (hours || minutes || seconds) {
      interval = setInterval(() => {
        if (!minutes) {
          setHours(state => state - 1);
          setMinutes(59);
        }
        if (!seconds) {
          setMinutes(state => state - 1);
        }
        setSeconds(seconds ? seconds - 1 : 59);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  return (
    <div className={styles.container}>
      <p>{String(hours).length > 1 ? hours : `0${hours}`}</p>
      <p>:</p>
      <p>{String(minutes).length > 1 ? minutes : `0${minutes}`}</p>
      <p>:</p>
      <p>{String(seconds).length > 1 ? seconds : `0${seconds}`}</p>
    </div>
  );
});
