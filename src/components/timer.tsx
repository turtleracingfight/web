import styles from "../styles/components/timer.module.scss";
import { memo, useEffect, useState } from "react";
import { useStoreContact } from "../store/store-contract.ts";

let interval = 0;
export const Timer = memo(() => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const requestGetNext = useStoreContact().requestGetNext;

  useEffect(() => {
    (async () => {
      const data = await requestGetNext();
      if (data) {
        const { seconds, minutes, hours } = data;
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    })();
  }, []);

  useEffect(() => {
    if (hours || minutes || seconds) {
      interval = setInterval(() => {
        if (seconds) {
          const sec = seconds - 1;
          const minute = !sec && minutes ? minutes - 1 : 0;
          const hour = !minute && hours ? hours - 1 : 0;
          setHours(hour);
          setMinutes(minute);
          setSeconds(sec);
        }
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
